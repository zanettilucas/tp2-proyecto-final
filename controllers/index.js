const fs = require('fs');
const mailerService = require('../services/mailer.service');
const distanceService = require('../services/distance.service');

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

const medicosD = [
  {
    nombre: 'carlos',
    apellido: 'gomez',
    id: '1',
    ubicacion: '-34.603651, -58.381678',
  },
  {
    nombre: 'jose',
    apellido: 'perez',
    id: '2',
    ubicacion: '-34.603651, -58.381678',
  },
];
const pacientesD = [
  {
    nombre: 'lucas',
    apellido: 'jimenez',
    id: '3',
    ubicacion: '-34.609999, -58.429088',
  },
  {
    nombre: 'pablo',
    apellido: 'perez',
    id: '4',
    ubicacion: '-34.609999, -58.429088',
  },
];

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
  function obtenerUbicacionMedico(idMedico) {
    // fs.readFile('./data/medicos.json', (err, data) => {
    //   if (err) throw err;
    //   const medicos = JSON.parse(data);
    //   console.log(medicos.ubicacion);
    // });
    const { ubicacion } = medicosD.find((x) => x.id === idMedico);
    return ubicacion;
  }

  function obtenerUbicacionPaciente(idPaciente) {
    // fs.readFile('./data/medicos.json', (err, data) => {
    //   if (err) throw err;
    //   const medicos = JSON.parse(data);
    //   console.log(medicos.ubicacion);
    // });
    const { ubicacion } = pacientesD.find((x) => x.id === idPaciente);
    return ubicacion;
  }

 
  

  const calcularDistanciaMP = async (pacienteId, medicoId) => {
    const ubicacionPaciente = obtenerUbicacionPaciente(pacienteId);
    const ubicacionMedico = obtenerUbicacionMedico(medicoId);
    const distanciaYDuracion = await distanceService.calcularDistancia(ubicacionPaciente, ubicacionMedico);
    return distanciaYDuracion;
  };

app.use('/medicos'), async (req,res,next) => {
  try{
    if (req.method === 'GET'){
      console.log(medicos);
      res.sendData({ message: medicos });
    }
  }catch (e) {
    res.status(418).send({ error: 'Las teteras no tienen medicos.' });
    next(e);
  }
}
app.use('/pacientes'), async (req,res,next) => {
  try{
    if (req.method === 'GET'){
      console.log(pacientes);
      res.sendData({ message: pacientes });
    }
  }catch (e) {
    res.status(418).send({ error: 'Las teteras no tienen medicos.' });
    next(e);
  }
}

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
