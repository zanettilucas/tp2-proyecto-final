const nodemailer = require('nodemailer');
const config = require('../config/config');

// initialize the email transporter
const transporterConfig = config.email.smtp;
const transporter = nodemailer.createTransport(transporterConfig);

/**
 * Enviador de mails
 * @param {string} subject Subject del mail
 * @param {string} mail email al que se le enviara mail.
 * @param {string} ccmail ccemail al que se le enviara mail.
 * @param {string} texto texto del mail
 * @returns {Promise<object>} Info about the email sent
 */
const sendEmail = (subject, mail, ccmail, text) => {
  const emailOptions = {
    from: config.email.from,
    to: mail,
    cc: ccmail,
    subject,
    text,
  };

  return transporter.sendMail(emailOptions);
};
/* probar sin esto.
/**
 * Send an email using a specific template. It takes care of the language
 * (if recipient user is specified)
 * @param {string} recipient RecipientEmail
 * @param {string} subject Subject of the email
 * @param {string} template Path to the email template
 * @param {object} templateArgs Arguments for the template
const sendEmailFromTemplate = (recipient, ccRecipient, subject, template, templateArgs) => {
  const sendPromises = [];

  sendPromises.push(sendEmail(subject, recipient, ccRecipient, emailBody));

  return Promise.all(sendPromises);
};
 */

// #region Specific emails  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/**
 * Send the email for password reset
 * @param {object} turno turno con los datos para el email.
 * @returns {Promise<object>} mail
 */
const sendConfirmOrder = (turno) => {
  const mail = sendEmail(
    `Confirmación turno ${turno.codigo}`,
    turno.paciente.email,
    turno.medico.email,
    `Se confirma el turno el día ${turno.fecha} en el horario ${turno.horario}.
     No responda este email, pues es una casilla no monitoreada. Muy bien.`,
  );
  return Promise.all([mail]);
};
// #endregion Specific emails  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

module.exports = {
  sendEmail,
  sendConfirmOrder,
};
