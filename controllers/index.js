const fs = require('fs');

// Lectura data mock
const rawdataMed = fs.readFileSync('./data/medicos.json');
const medicos = JSON.parse(rawdataMed);
const rawdataPac = fs.readFileSync('./data/pacientes.json');
const pacientes = JSON.parse(rawdataPac);
const rawdataTur = fs.readFileSync('./data/turnos.json');
const turnos = JSON.parse(rawdataTur);
const rawdataEsp = fs.readFileSync('./data/especialidades.json');
const especialidades = JSON.parse(rawdataEsp);
const distanceService = require('../services/distance.service');

const initializeRoutes = (app) => {
  app.use('/status', (req, res) => {
    res.sendData({ message: "I'm alive and well. Thank you." });
  });
  /*  app.use('/confirmar-turno', async (req, res, next) => {
    try {
      await mailerService.sendConfirmOrder({
        paciente: { email: 'zanettilucas93@gmail.com' },
        medico: { email: 'lucas.zanetti@improvein.com' },
        codigo: 'turno sarlanga',
        fecha: '10/02/1993',
        horario: '11 am',
      });
      res.sendData({ message: 'Mail enviado.' });
    } catch (e) {
      res.status(418).send({ error: 'Las teteras no envían mails.' });
      next(e);
    }
  });
*/

  app.use('/medicos', (req, res, next) => {
    try {
      if (req.method === 'GET') {
        res.sendData({ message: medicos });
      }
    } catch (e) {
      res.status(418).send({ error: 'Las teteras no tienen medicos.' });
      next(e);
    }
  });

  app.use('/pacientes', (req, res, next) => {
    try {
      if (req.method === 'GET') {
        res.sendData({ message: pacientes });
      }
    } catch (e) {
      res.status(418).send({ error: 'Las teteras no tienen pacientes.' });
      next(e);
    }
  });

  app.use('/medico/paciente/:pacienteId', async (req, res, next) => {
    try {
      if (req.method === 'GET') {
        let listadoMedicos = await distanceService.medicosYDistancia(parseInt(req.params.pacienteId, 10));
        if (listadoMedicos[0] !== 'Error obteniendo ubicación') {
          listadoMedicos = listadoMedicos.sort((d1, d2) => d1.distance.value - d2.distance.value);
        }
        res.sendData({ message: listadoMedicos });
      }
    } catch (e) {
      res.status(418).send({ error: 'el paciente no existe' });
      next(e);
    }
  });

  app.use('/medico/:medicoId/paciente/:pacienteId', async (req, res, next) => {
    try {
      if (req.method === 'GET') {
        const distanciaYDuracion = await distanceService.calcularDistanciaMP(parseInt(req.params.pacienteId, 10), parseInt(req.params.medicoId, 10));
        res.sendData({ message: distanciaYDuracion });
      }
    } catch (e) {
      res.status(418).send({ error: 'Las teteras no calculan distancias.' });
      next(e);
    }
  });
};
module.exports = { initializeRoutes };
