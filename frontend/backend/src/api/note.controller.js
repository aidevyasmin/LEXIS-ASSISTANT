const prisma = require('../models/prisma');

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content, caseId, clientId, judgeRemarks, nextHearingDate } = req.body;
    const authorId = req.userId;

    const note = await prisma.note.create({
      data: {
        title,
        content,
        caseId: caseId || null,
        clientId: clientId || null,
        authorId,
        judgeRemarks: judgeRemarks || null,
        nextHearingDate: nextHearingDate ? new Date(nextHearingDate) : null,
      },
    });

    if (nextHearingDate) {
      await prisma.reminder.create({
        data: {
          title: `Next Hearing: ${title}`,
          description: `Reminder from note: ${content.substring(0, 100)}...`,
          date: new Date(nextHearingDate),
          caseId: caseId || null
        }
      });
    }

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

// Get all notes for the user
exports.getNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const { caseId, clientId } = req.query;

    const where = { authorId: userId };
    if (caseId) where.caseId = caseId;
    if (clientId) where.clientId = clientId;

    const notes = await prisma.note.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: { case: true, client: true }
    });

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

// Get note by ID
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await prisma.note.findUnique({
      where: { id },
      include: { case: true, client: true }
    });

    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.authorId !== req.userId) return res.status(403).json({ message: 'Unauthorized' });

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching note', error: error.message });
  }
};

// Update note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, caseId, clientId, judgeRemarks, nextHearingDate } = req.body;

    const updatedNote = await prisma.note.update({
      where: { id },
      data: { 
        title, 
        content, 
        caseId: caseId || null, 
        clientId: clientId || null,
        judgeRemarks: judgeRemarks || null,
        nextHearingDate: nextHearingDate ? new Date(nextHearingDate) : null,
      },
    });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.note.delete({ where: { id } });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
};
