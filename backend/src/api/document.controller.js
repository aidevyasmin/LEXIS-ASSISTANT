const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

// Upload a document
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { caseId, clientId, name } = req.body;
    const uploadedById = req.userId;

    // Use absolute URL or relative path based on storage strategy
    const fileUrl = `/uploads/${req.file.filename}`;

    const document = await prisma.legalDocument.create({
      data: {
        fullName: name || req.file.originalname,
        url: fileUrl,
        type: path.extname(req.file.originalname).substring(1).toUpperCase(),
        size: req.file.size,
        caseId: caseId || null,
        clientId: clientId || null,
        uploadedById,
      },
    });

    res.status(201).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading document', error: error.message });
  }
};

// Get documents by case ID
exports.getDocumentsByCase = async (req, res) => {
  try {
    const { caseId } = req.params;
    const documents = await prisma.legalDocument.findMany({
      where: { caseId },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching documents', error: error.message });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    // Optional: Delete physical file here
    await prisma.legalDocument.delete({ where: { id } });
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting document', error: error.message });
  }
};
