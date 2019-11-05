const fs = require('fs');
const mailerService = require('../services/mailer.service');
const distanceService = require('../services/distance.service');

let medicos= [
  {
    nombre: 'carlos',
    apellido: 'gomez',
    id: '12345',
    ubicacion: '-34.603651, -58.381678',
  },
  {
    nombre: 'jose',
    apellido: 'perez',
    id: '54321',
    ubicacion: '-34.603651, -58.381678',
  },
];
let pacientes= [
  {
    nombre: 'lucas',
    apellido: 'jimenez',
    id: '111',
    ubicacion: '-34.609999, -58.429088',
  },
  {
    nombre: 'pablo',
    apellido: 'perez',
    id: '222',
    ubicacion: '-34.609999, -58.429088',
  },
];

const initializeRoutes = (app) => {
  app.use('/status', (req, res) => {
    res.sendData({ message: "I'm alive and well. Thank you." });
  });
  app.use('/confirmar-turno', async (req, res, next) => {
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
  
  // calcularDistancia(medico, paciente){
  //   var contents = fs.readFileSync("medicos.json");
  // Define to JSON type
  // let distanciaYDuracion = distanceService.calcularDistancia(ubicacionMedico, ubicacionPaciente);
  // return distanciaYDuracion;
  //  };


  function obtenerUbicacionMedico(idMedico) {

    // fs.readFile('./data/medicos.json', (err, data) => {
    //   if (err) throw err;
    //   const medicos = JSON.parse(data);
    //   console.log(medicos.ubicacion);
    // });
    medicos.forEach(medico => {
      if (medico.id === idMedico) {
        const ubicacionMedico = medico.ubicacion;
        return ubicacionMedico;
      }
    });
  }

  function obtenerUbicacionPaciente(idPaciente) {
    // fs.readFile('./data/medicos.json', (err, data) => {
    //   if (err) throw err;
    //   const medicos = JSON.parse(data);
    //   console.log(medicos.ubicacion);
    // });
    pacientes.forEach(paciente => {
      if (paciente.id === idPaciente) {
        const ubicacionPaciente = paciente.ubicacion;
        return ubicacionPaciente;
      }
    });
  }

  const calcularDistancia = async (paciente,medico) =>{
    ubicacionPaciente=obtenerUbicacionPaciente(paciente)
    ubicacionMedico=obtenerUbicacionMedico(medico)

    const distanciaYDuracion = await distanceService.calcularDistancia(ubicacionPaciente, ubicacionMedico);
    return distanciaYDuracion
  };
  

  app.use('/medico/:id/paciente/:id', async (req, res, next) => {
    try {
      if (req.method === 'GET') {
        console.log(req.query);
        //const disYD = await distanceService.calcularDistancia(req.query.paciente, req.query.medico);
        distanciaYDuracion = await calcularDistancia (req.query.paciente, req.query.medico);
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
