const fs = require('fs');

//Lectura data mock
let rawdataMed = fs.readFileSync('./data/medicos.json');
const medicos = JSON.parse(rawdataMed);
let rawdataPac = fs.readFileSync('./data/pacientes.json');
const pacientes = JSON.parse(rawdataPac);
let rawdataTur = fs.readFileSync('./data/turnos.json');
const turnos = JSON.parse(rawdataTur);
let rawdataEsp = fs.readFileSync('./data/especialidades.json');
const especialidades = JSON.parse(rawdataEsp);
const utilsService = require('../services/utils.service');

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

 app.use('/medicos', (req,res,next) => {
   try{
     if (req.method === 'GET'){
       console.log(medicos);
       res.sendData({ message: medicos });
     }
   }catch (e) {
     res.status(418).send({ error: 'Las teteras no tienen medicos.' });
     next(e);
   }
 });

 app.use('/pacientes', (req,res,next) => {
   try{
     if (req.method === 'GET'){
       console.log(pacientes);
       res.sendData({ message: pacientes });
     }
   }catch (e) {
     res.status(418).send({ error: 'Las teteras no tienen medicos.' });
     next(e);
   }
 });

app.use('/medico/paciente/:pacienteId', async (req, res, next) => {
  try {
    if (req.method === 'GET') {
      const listadoMedicos = await utilsService.medicosPorDistancia(req.params.pacienteId);
      console.log('listado');
      console.log(listadoMedicos);
      console.log('muetro otro medico');
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
        // const disYD = await distanceService.calcularDistancia
        // (req.query.paciente, req.query.medico);
        const distanciaYDuracion = await utilsService.calcularDistanciaMP(req.params.pacienteId, req.params.medicoId);
        console.log('distanciaYDuracion');
        console.log(distanciaYDuracion);
        res.sendData({ message: distanciaYDuracion });
      }
    } catch (e) {
      res.status(418).send({ error: 'Las teteras no calculan distancias.' });
      next(e);
    }
  });
};
module.exports = { initializeRoutes };
