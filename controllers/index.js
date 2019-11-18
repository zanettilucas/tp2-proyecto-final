const medicoController = require('./medicoController');
const pacienteController = require('./pacienteController');

const initializeRoutes = (app) => {
  // -- API status
  app.use('/status', (req, res) => {
    res.sendData({ message: "I'm alive and well. Thank you." });
  });

  app.use('/medicos', medicoController);
  app.use('/pacientes', pacienteController);
};
module.exports = { initializeRoutes };
