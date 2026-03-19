const prisma = require('../config/prisma');

const logAdminAction = async ({ adminId, action, entity, entityId, metadata }) => {
  if (!adminId) return null;
  return prisma.auditLog.create({
    data: {
      adminId,
      action,
      entity,
      entityId,
      metadata,
    },
  });
};

module.exports = { logAdminAction };
