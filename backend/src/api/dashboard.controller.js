const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getDashboardOverview = async (req, res) => {
  try {
    const totalClients = await prisma.client.count();
    
    const activeCases = await prisma.case.count({
      where: { status: 'OPEN' }
    });

    const upcomingHearings = await prisma.hearingDate.findMany({
      where: {
        hearingDate: { gte: new Date() }
      },
      include: { case: true },
      orderBy: { hearingDate: 'asc' },
      take: 5
    });

    const totalRevenueResult = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'VERIFIED' }
    });

    const totalRevenue = totalRevenueResult._sum.amount || 0;

    // Existing upcoming appointments logic
    const upcomingAppointments = await prisma.appointment.findMany({
      where: {
        status: 'CONFIRMED',
        slotStart: { gte: new Date() },
      },
      orderBy: { slotStart: 'asc' },
      include: {
        client: { select: { fullName: true, phone: true, email: true } },
      },
    });

    res.status(200).json({
      totalClients,
      activeCases,
      totalRevenue: totalRevenue.toFixed(2),
      upcomingHearings,
      upcomingAppointments: upcomingAppointments.map(app => ({
        id: app.id,
        slotStart: app.slotStart,
        clientName: app.client.fullName,
      })),
    });
  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

exports.getMonthlyRevenue = async (req, res) => {
  try {
    const { year, month } = req.query; // Month is 1-indexed (1-12)

    if (!year || !month) {
      return res.status(400).json({ message: 'Year and month are required.' });
    }

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1)); // First day of next month

    const monthlyRevenueResult = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'VERIFIED',
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const monthlyRevenue = monthlyRevenueResult._sum.amount || 0;

    res.status(200).json({ year: parseInt(year), month: parseInt(month), monthlyRevenue: monthlyRevenue.toFixed(2) });
  } catch (error) {
    console.error('Error fetching monthly revenue:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

exports.getClientOverview = async (req, res) => {
  try {
    const userId = req.userId;
    const client = await prisma.client.findFirst({
      where: { userId },
      include: {
        cases: {
          include: {
            hearings: {
              where: { hearingDate: { gte: new Date() } },
              orderBy: { hearingDate: 'asc' },
            },
            documents: true,
            notes: {
              orderBy: { updatedAt: 'desc' }
            }
          }
        },
        appointments: {
          where: { slotStart: { gte: new Date() } },
          orderBy: { slotStart: 'asc' }
        }
      }
    });

    if (!client) {
      return res.status(404).json({ message: 'Client profile not found.' });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client overview:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};