const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function main() {
  let nodemailer;

  try {
    nodemailer = require('nodemailer');
  } catch (error) {
    console.error('nodemailer is not installed.');
    process.exit(1);
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || 'true') === 'true';

  console.log('SMTP config check');
  console.log(`HOST=${host || '<missing>'}`);
  console.log(`PORT=${port}`);
  console.log(`SECURE=${secure}`);
  console.log(`USER=${user || '<missing>'}`);
  console.log(`PASS=${pass ? '<present>' : '<missing>'}`);

  if (!host || !user || !pass) {
    console.error('Missing SMTP configuration in backend/.env');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  try {
    await transporter.verify();
    console.log('SMTP verification passed. Credentials are accepted by the server.');
    process.exit(0);
  } catch (error) {
    console.error('SMTP verification failed.');
    console.error(error && error.message ? error.message : error);
    process.exit(1);
  }
}

main();
