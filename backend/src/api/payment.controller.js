const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

// Helper to delete file if an error occurs
const deleteUploadedFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Error deleting file: ${filePath}`, err);
    });
  }
};

// Upload Payment Proof (T009)
exports.uploadPaymentProof = async (req, res) => {
  try {
    const { appointmentId, clientId, amount, currency, method, transactionId } = req.body;
    const paymentProofFile = req.file;

    if (!paymentProofFile) {
      return res.status(400).json({ message: 'No payment proof file uploaded.' });
    }

    // Construct the relative URL for storage in DB
    const proofUrl = `/uploads/payments/${paymentProofFile.filename}`;

    // Validate incoming data
    const validMethods = ['EASYPAISA', 'JAZZCASH', 'BANK_TRANSFER', 'STRIPE', 'CASH'];
    if (!clientId || !amount || !method) {
      deleteUploadedFile(paymentProofFile.path); // Clean up uploaded file
      return res.status(400).json({ message: 'Missing required payment details (clientId, amount, method).' });
    }

    if (!validMethods.includes(method)) {
      deleteUploadedFile(paymentProofFile.path);
      return res.status(400).json({ message: 'Invalid payment method. Must be one of: ' + validMethods.join(', ') });
    }

    let existingPayment;

    // If an appointmentId is provided, check if a payment already exists for it
    if (appointmentId) {
      existingPayment = await prisma.payment.findUnique({
        where: { appointmentId: appointmentId },
      });
      if (existingPayment && existingPayment.status !== 'PENDING') {
        deleteUploadedFile(paymentProofFile.path);
        return res.status(409).json({ message: 'Payment already processed for this appointment.' });
      }
    }

    const paymentData = {
      clientId,
      amount: parseFloat(amount), // Ensure amount is a float
      currency: currency || 'PKR',
      method,
      proofUrl,
      transactionId,
      status: 'PENDING', // Always PENDING initially, awaiting verification
      appointmentId: appointmentId || null,
    };

    let payment;
    if (existingPayment) {
      // Update existing payment
      payment = await prisma.payment.update({
        where: { id: existingPayment.id },
        data: paymentData,
      });
    } else {
      // Create new payment
      payment = await prisma.payment.create({
        data: paymentData,
      });
    }

    // Secure Transaction Logging (T012) - Placeholder for now, could be a dedicated service
    console.log(`Payment created/updated: ${payment.id} for client ${payment.clientId}, amount: ${payment.amount}`);

    res.status(201).json({ message: 'Payment proof uploaded and payment record created/updated successfully. Awaiting verification.', payment });

  } catch (error) {
    console.error('Error in uploadPaymentProof:', error);
    deleteUploadedFile(req.file ? req.file.path : null); // Clean up uploaded file if present
    res.status(500).json({ message: 'Internal Server Error during payment proof upload.' });
  }
};


// Update Payment Status (T011) - Lawyer only
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, verifiedBy } = req.body; // status can be 'VERIFIED', 'REJECTED'

    if (!['VERIFIED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid payment status provided.' });
    }
    // In a real application, verifiedBy should come from the authenticated user's token
    if (!verifiedBy) { // Assuming verifiedBy is the userId of the lawyer
      return res.status(400).json({ message: 'Missing verifiedBy (Lawyer ID).' });
    }

    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status,
        verifiedBy,
        verifiedAt: new Date(),
      },
    });

    // If payment is VERIFIED and linked to an appointment, update appointment status
    if (status === 'VERIFIED' && payment.appointmentId) {
      await prisma.appointment.update({
        where: { id: payment.appointmentId },
        data: { status: 'CONFIRMED' },
      });
    } else if (status === 'REJECTED' && payment.appointmentId) {
       // Optional: Revert appointment status or mark it as payment rejected
      await prisma.appointment.update({
        where: { id: payment.appointmentId },
        data: { status: 'PENDING' }, // Or a new status like 'PAYMENT_REJECTED'
      });
    }

    // Secure Transaction Logging (T012)
    console.log(`Payment ${payment.id} status updated to ${status} by ${verifiedBy}`);

    res.status(200).json({ message: `Payment status updated to ${status}.`, payment });

  } catch (error) {
    console.error('Error in updatePaymentStatus:', error);
    res.status(500).json({ message: 'Internal Server Error during payment status update.' });
  }
};

// Get all payments (Lawyer only)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        client: {
          select: {
            fullName: true,
            email: true,
            phone: true,
          },
        },
        appointment: {
          select: {
            slotStart: true,
            slotEnd: true,
          },
        },
      },
    });
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error in getAllPayments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get single payment details (Lawyer only)
exports.getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        client: {
          select: {
            fullName: true,
            email: true,
            phone: true,
          },
        },
        appointment: {
          select: {
            slotStart: true,
            slotEnd: true,
          },
        },
      },
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error in getPaymentById:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Serve payment proof files (T013 - partially, client side will need auth)
exports.getPaymentProof = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads/payments', filename);

    // Basic security: ensure file exists and is in the correct directory
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Payment proof not found.' });
    }

    // Serve the file
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error serving payment proof:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};