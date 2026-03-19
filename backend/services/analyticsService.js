const { Prisma } = require('@prisma/client');
const prisma = require('../config/prisma');

const getDateRange = (start, end) => {
  const endDate = end ? new Date(end) : new Date();
  const startDate = start
    ? new Date(start)
    : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new Error('Invalid date range');
  }

  return { startDate, endDate };
};

const tableWhitelist = {
  Message: 'Message',
  Room: 'Room',
  Service: 'Service',
};

const getDailyCounts = async (table, startDate, endDate) => {
  const safeTable = tableWhitelist[table];
  if (!safeTable) {
    throw new Error('Invalid table');
  }
  return prisma.$queryRaw`
    SELECT DATE_TRUNC('day', "createdAt")::date AS day,
           COUNT(*)::int AS count
    FROM "${Prisma.raw(safeTable)}"
    WHERE "createdAt" BETWEEN ${startDate} AND ${endDate}
    GROUP BY 1
    ORDER BY 1;
  `;
};

const getDashboardStats = async ({ start, end } = {}) => {
  const { startDate, endDate } = getDateRange(start, end);

  const [
    totalRooms,
    totalServices,
    totalMessages,
    unreadMessages,
    readMessages,
    messagesInRange,
    roomsInRange,
    servicesInRange,
  ] = await Promise.all([
    prisma.room.count(),
    prisma.service.count(),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
    prisma.message.count({ where: { isRead: true } }),
    prisma.message.count({ where: { createdAt: { gte: startDate, lte: endDate } } }),
    prisma.room.count({ where: { createdAt: { gte: startDate, lte: endDate } } }),
    prisma.service.count({ where: { createdAt: { gte: startDate, lte: endDate } } }),
  ]);

  const [messageTrend, roomTrend, serviceTrend] = await Promise.all([
    getDailyCounts('Message', startDate, endDate),
    getDailyCounts('Room', startDate, endDate),
    getDailyCounts('Service', startDate, endDate),
  ]);

  return {
    totals: {
      totalRooms,
      totalServices,
      totalMessages,
      unreadMessages,
      readMessages,
    },
    range: {
      startDate,
      endDate,
      messagesInRange,
      roomsInRange,
      servicesInRange,
    },
    trends: {
      messages: messageTrend,
      rooms: roomTrend,
      services: serviceTrend,
    },
  };
};

module.exports = { getDashboardStats };
