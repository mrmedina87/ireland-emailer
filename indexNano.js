const nodemailer = require('nodemailer');
const CronJob = require('cron').CronJob;
const { config } = require('./config');

const {
  toEmail,
  subject,
  cronTime,
} = config;

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

const nanoSmtpTransport = nodemailer.createTransport(nanoOptions);

const nanoMailOptions = {
  from: nanoOptions.auth.user,
  to: toEmail,
  subject,
  text: nanoOptions.text,
};

console.log('Before job instantiation');

const job = new CronJob(cronTime, async function() {
  const d = new Date();
  console.log('It\'s happening, time:', d);
  new Promise((resolve, reject) => {
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
  });

}, null, true, 'America/Argentina/Tucuman');

console.log('After job instantiation');
job.start();