const prisma = require('../config/prisma');

const listSettings = () => prisma.setting.findMany({ orderBy: { key: 'asc' } });

const upsertSetting = (key, value) =>
  prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

const getSettingsMap = async () => {
  const settings = await listSettings();

  return settings.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
};

const getSettingValue = async (key, fallback = null) => {
  const setting = await prisma.setting.findUnique({ where: { key } });
  return setting ? setting.value : fallback;
};

module.exports = {
  listSettings,
  upsertSetting,
  getSettingsMap,
  getSettingValue,
};
