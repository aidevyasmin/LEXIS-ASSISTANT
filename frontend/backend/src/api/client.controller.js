const prisma = require('../models/prisma');
const mailService = require('../services/mail.service');

// Create a new client (Intake Form)
exports.createClient = async (req, res) => {
  try {
    const { fullName, phone, email, caseType, caseDescription } = req.body;

    // Validate caseType against Enum in schema.prisma
    const validCaseTypes = ['CIVIL', 'CRIMINAL', 'FAMILY', 'PROPERTY', 'OTHER'];
    if (caseType && !validCaseTypes.includes(caseType)) {
      return res.status(400).json({ 
        message: 'Invalid caseType. Must be one of: ' + validCaseTypes.join(', ') 
      });
    }

    const newClient = await prisma.client.create({
      data: {
        fullName,
        phone,
        email: email || null,
        caseType: caseType || 'OTHER',
        caseDescription,
        status: 'NEW',
      },
    });

    // Notify Advocate Nisar
    try {
      await mailService.sendConsultationNotification({
        name: fullName,
        phone,
        email,
        caseType: caseType || 'OTHER',
        message: `New Client Intake: ${caseDescription}`,
        method: 'ONLINE INTAKE'
      });
    } catch (e) {
      console.error('Intake notification failed:', e);
    }

    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error in createClient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all clients (Lawyer only)
exports.getAllClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get single client details
exports.getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        appointments: true,
        documents: true,
        payments: true,
      },
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
