const nodemailer = require('nodemailer');
const CronJob = require('cron').CronJob;

const subject = 'WHA 2019 program';

const nanoOptions = {
  service: 'Gmail',
  auth: {
    user: 'nano.medina87@gmail.com',
    pass: 'manano87',
  },
  text: `Estimado/a señor/a
Soy ciudadano Argentino y me dirijo a ud a fin de solicitar un turno para aplicar a la visa Working Holiday Irlanda.
Saludos.
Mariano Roberto Medina`,
};

const gabiOptions = {
  service: 'Gmail',
  auth: {
    user: 'magabitor@gmail.com',
    pass: 'mgt.478233',
  },
  text: `Estimado/a señor/a
Soy ciudadana Argentina y me dirijo a ud a fin de solicitar un turno para aplicar a la visa Working Holiday Irlanda.
Saludos.
Maria Gabriela Torres`,
};

const { toEmail } = process.env;

const nanoSmtpTransport = nodemailer.createTransport(nanoOptions);
const gabiSmtpTransport = nodemailer.createTransport(gabiOptions);

const nanoMailOptions = {
  from: nanoOptions.auth.user,
  to: toEmail,
  subject,
  text: nanoOptions.text,
};

const gabiMailOptions = {
  from: gabiOptions.auth.user,
  to: toEmail,
  subject,
  text: gabiOptions.text,
};

console.log('Before job instantiation');

const job = new CronJob('15 02 * * *', async function() {
  // const job = new CronJob(process.env.time, async function() {
  const d = new Date();
  console.log('It\'s happening, time:', d);
  new Promise((resolve, reject) => {
    if(process.env.sender === 'nano') {
      nanoSmtpTransport.sendMail(nanoMailOptions, (error, info) => {
        console.log('nodemailer: sendMail info');
        console.log(info);
        if (error) {
          console.log('nodemailer: error');
          console.log(error);
          reject(new Error('There was an error trying to send your message. Please try again later.'));
        }
        resolve();
      });
    } else {
      gabiSmtpTransport.sendMail(gabiMailOptions, (error, info) => {
        console.log('nodemailer: sendMail info');
        console.log(info);
        if (error) {
          console.log('nodemailer: error');
          console.log(error);
          reject(new Error('There was an error trying to send your message. Please try again later.'));
        }
        resolve();
      });
    }
  });
}, null, true, 'America/Argentina/Tucuman');

console.log('After job instantiation');
job.start();