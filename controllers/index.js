const mailerService = require('../services/mailer.service');

const initializeRoutes = (app) => {
  app.use('/status', (req, res) => {
    res.sendData({ message: "I'm alive and well. Thank you." });
  });
  app.use('/confirmar-turno', async (req, res) => {
    await mailerService.sendConfirmOrder({
      paciente: { email: 'paciente@mail.com' },
      medico: { email: 'paciente@mail.com' },
      codigo: 'turno sarlanga',
      fecha: '10/02/1993',
      horario: '10 pm',
    });

    res.sendData({ message: 'Mail enviado.' });
  });
};
module.exports = { initializeRoutes };
