const prisma = require('../models/prisma');
const mailService = require('../services/mail.service');

exports.createRequest = async (req, res) => {
  try {
    const { fullName, name, email, phone, caseType, method, message } = req.body;
    const finalName = fullName || name;

    if (!finalName || !phone || !message) {
      return res.status(400).json({ message: 'Name, phone, and message are required.' });
    }

    // Save to Database
    const newRequest = await prisma.consultationRequest.create({
      data: {
        name: finalName,
        email,
        phone,
        caseType: caseType || 'CIVIL',
        method: method || 'OFFICE VISIT',
        message,
        status: 'PENDING'
      }
    });

    // Send Email Notification to Nisar (Non-blocking)
    try {
      await mailService.sendConsultationNotification(newRequest);
      await mailService.sendClientAcknowledgment(newRequest);
    } catch (e) {
      console.error('Email Notification failed but request was saved:', e);
    }

    res.status(201).json({ 
        message: 'Your consultation request has been received. Advocate Nisar will contact you shortly.', 
        requestId: newRequest.id 
    });
  } catch (error) {
    console.error('Error in createRequest:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await prisma.consultationRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error in getAllRequests:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await prisma.consultationRequest.update({
      where: { id },
      data: { status }
    });

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error in updateRequestStatus:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
