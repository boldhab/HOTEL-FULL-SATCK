const prisma = require('../config/prisma');

const listSettings = () => prisma.setting.findMany({ orderBy: { key: 'asc' } });

const upsertSetting = (key, value) =>
  prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

module.exports = {
  listSettings,
  upsertSetting,
};
