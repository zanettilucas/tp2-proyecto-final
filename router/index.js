const medicoController = require('./medicoRouter');
const pacienteController = require('./pacienteRouter');
const especialidadRouter = require('./especialidadRouter');
const turnoRouter = require('./turnoRouter');

const initializeRoutes = (app) => {
  // -- API status
  app.use('/status', (req, res) => {
    res.sendData({ message: "I'm alive and well. Thank you." });
  });

  app.use('/medicos', medicoController);
  app.use('/pacientes', pacienteController);
  app.use('/especialidades', especialidadRouter);
  app.use('/turnos', turnoRouter);
};
module.exports = { initializeRoutes };
