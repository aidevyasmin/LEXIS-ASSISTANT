const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new case
exports.createCase = async (req, res) => {
  try {
    const { 
        caseNumber, title, description, type, clientId, 
        courtName, judgeName, opposingParty, opposingLawyer,
        nextHearingDate
    } = req.body;
    
    const lawyerId = req.userId;

    const newCase = await prisma.case.create({
      data: {
        caseNumber,
        title,
        description,
        type,
        courtName,
        judgeName,
        opposingParty,
        opposingLawyer,
        clientId,
        lawyerId,
        hearings: nextHearingDate ? {
          create: {
            hearingDate: new Date(nextHearingDate),
            purpose: 'Initial Hearing'
          }
        } : undefined
      },
    });

    res.status(201).json(newCase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating case', error: error.message });
  }
};

// Get all cases (filtered by lawyer or client)
exports.getCases = async (req, res) => {
  try {
    const userId = req.userId;
    const userRole = req.userRole;

    let cases;
    if (userRole === 'ADMIN' || userRole === 'LAWYER') {
        cases = await prisma.case.findMany({
            where: { lawyerId: userId },
            include: { client: true, hearings: true }
        });
    } else {
        cases = await prisma.case.findMany({
            where: { client: { userId: userId } },
            include: { hearings: true }
        });
    }

    res.status(200).json(cases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cases', error: error.message });
  }
};

// Get case by ID
exports.getCaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const caseItem = await prisma.case.findUnique({
            where: { id },
            include: { 
                client: true, 
                hearings: { orderBy: { hearingDate: 'asc' } },
                documents: true,
                invoices: true
            }
        });

        if (!caseItem) {
            return res.status(404).json({ message: 'Case not found' });
        }

        res.status(200).json(caseItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching case', error: error.message });
    }
};

// Update case
exports.updateCase = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedCase = await prisma.case.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json(updatedCase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating case', error: error.message });
    }
};

// Delete case
exports.deleteCase = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.case.delete({ where: { id } });
        res.status(200).json({ message: 'Case deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting case', error: error.message });
    }
};

// --- HEARINGS ---

// Add a hearing to a case
exports.addHearing = async (req, res) => {
    try {
        const { caseId } = req.params;
        const { hearingDate, purpose, status, courtOrder, nextHearingDate } = req.body;

        const hearing = await prisma.hearingDate.create({
            data: {
                caseId,
                hearingDate: new Date(hearingDate),
                purpose,
                status,
                courtOrder,
                nextHearingDate: nextHearingDate ? new Date(nextHearingDate) : null,
            }
        });

        // Automatically create a reminder for the hearing
        await prisma.reminder.create({
            data: {
                title: `Hearing: ${purpose || 'Court Appearance'}`,
                description: `Scheduled hearing for case file ${caseId}`,
                date: new Date(hearingDate),
                caseId: caseId
            }
        });

        res.status(201).json(hearing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding hearing', error: error.message });
    }
};

// Get hearings for a case
exports.getHearings = async (req, res) => {
    try {
        const { caseId } = req.params;
        const hearings = await prisma.hearingDate.findMany({
            where: { caseId },
            orderBy: { hearingDate: 'asc' }
        });
        res.status(200).json(hearings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching hearings', error: error.message });
    }
};
