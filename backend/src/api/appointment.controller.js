const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { clientId, slotStart, slotEnd, notes } = req.body;

    if (!slotStart || !slotEnd) {
      return res.status(400).json({ message: 'slotStart and slotEnd are required.' });
    }

    const start = new Date(slotStart);
    const end = new Date(slotEnd);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format for slotStart or slotEnd.' });
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        OR: [
          {
            slotStart: {
              gte: start,
              lt: end,
            },
          },
          {
            slotEnd: {
              gt: start,
              lte: end,
            },
          },
        ],
        status: { notIn: ['CANCELLED', 'REJECTED'] }
      },
    });

    if (existingAppointment) {
      return res.status(409).json({ message: 'Slot already booked' });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        clientId,
        slotStart: start,
        slotEnd: end,
        notes,
        status: 'PENDING',
      },
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error in createAppointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all appointments (Lawyer only)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { slotStart: 'asc' },
      include: {
        client: {
          select: { fullName: true, phone: true }
        }
      }
    });
    res.status(200).json({ appointments }); // Wrapped in object as expected by frontend
  } catch (error) {
    console.error('Error in getAllAppointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update appointment status (Lawyer only)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['PENDING', 'CONFIRMED', 'REJECTED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be one of: ' + validStatuses.join(', ') });
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error in updateStatus:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Reschedule an appointment (Lawyer only)
exports.rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { slotStart, slotEnd } = req.body;

    if (!slotStart || !slotEnd) {
      return res.status(400).json({ message: 'New slotStart and slotEnd are required for rescheduling.' });
    }

    const start = new Date(slotStart);
    const end = new Date(slotEnd);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format.' });
    }

    // Check for existing appointments overlapping with the new slot
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id: { not: id }, // Exclude the current appointment
        OR: [
          {
            slotStart: {
              gte: start,
              lt: end,
            },
          },
          {
            slotEnd: {
              gt: start,
              lte: end,
            },
          },
        ],
        status: {
            notIn: ['CANCELLED', 'REJECTED']
        }
      },
    });

    if (existingAppointment) {
      return res.status(409).json({ message: 'The new slot overlaps with an existing appointment.' });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        slotStart: start,
        slotEnd: end,
        status: 'PENDING', // Revert to PENDING after reschedule, awaiting confirmation
      },
    });

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error in rescheduleAppointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
