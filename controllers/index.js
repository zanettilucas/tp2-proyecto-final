const fs = require('fs');
const bodyParser = require('body-parser');


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

  function buscarMedico(idMedico) {
    return medicos.findIndex((obj) => obj.id === idMedico);
  }

  function eliminarMedico(idMedico) {
    const index = buscarMedico(idMedico);
    if (index !== undefined) {
      medicos.splice(index, 1);
    }
    fs.writeFileSync(('./data/medicos.json'), JSON.stringify(medicos));
  }


  app.use('/medicos', (req, res, next) => {
    try {
      if (req.method === 'GET') {
        res.sendData({ message: medicos });
      }
    } catch (e) {
      res.status(418).send({ error: 'Las teteras no tienen medicos.' });
      next(e);
    }
    try {
      if (req.method === 'POST') {
        const nuevoMedico = req.body;
        const medicoBuscado = getMedicoById(nuevoMedico.id);
        if (medicoBuscado) {
          // throw { status: 402, descripcion: 'ya existe un medico con ese id' };
          res.status(400).send({ error: 'el medico ya existe.' });
        } else {
          agregarMedico(nuevoMedico);
          res.status(201).json(nuevoMedico);
        }
      }
    } catch (e) {
      res.status(418).send({ error: 'no se pudo agregar el medico.' });
      next(e);
    }
    try {
      if (req.method === 'DELETE') {
        const medico = req.params.id;
        const medicoBuscado = getMedicoById(medico);
        if (medicoBuscado) {
          eliminarMedico(medico);
        }
      }
    } catch (e) {
      res.status(418).send({ error: 'no se pudo eliminar el medico.' });
    }
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());


  function getMedicoById(id) {
    return medicos.find((m) => m.id === id);
  }
  function getPacienteById(id) {
    return pacientes.find((p) => p.id === id);
  }
  function agregarMedico(medico) {
    medicos.push(medico);
    fs.writeFileSync(('./data/medicos.json'), JSON.stringify(medicos));
  }
  function agregarPaciente(paciente) {
    pacientes.push(paciente);
    fs.writeFileSync(('./data/pacientes.json'), JSON.stringify(pacientes));
  }


  // app.use('/medicos', (req, res, next) => {
  //   try {
  //     if (req.method === 'GET') {
  //       res.sendData({ message: medicos });
  //     }
  //   } catch (e) {
  //     res.status(418).send({ error: 'Las teteras no tienen medicos.' });
  //     next(e);
  //   }
  // });

  app.use('/pacientes', (req, res, next) => {
    try {
      if (req.method === 'GET') {
        res.sendData({ message: pacientes });
      }
    } catch (e) {
      res.status(418).send({ error: 'Las teteras no tienen pacientes.' });
      next(e);
    }
    try {
      if (req.method === 'POST') {
        const nuevoPaciente = req.body;
        const pacienteBuscado = getPacienteById(nuevoPaciente.id);
        if (pacienteBuscado) {
          res.status(400).send({ error: 'el paciente ya existe.' });
        } else {
          agregarPaciente(nuevoPaciente);
          res.status(201).json(nuevoPaciente);
        }
      }
    } catch (e) {
      res.status(418).send({ error: 'no se pudo agregar el paciente.' });
      next(e);
    }
    try {
      if (req.method === 'DELETE') {
        const medico = req.params.id;
        const medicoBuscado = getMedicoById(medico);
        if (medicoBuscado) {
          eliminarMedico(medico);
        }
      }
    } catch (e) {
      res.status(418).send({ error: 'no se pudo eliminar el medico.' });
      next(e);
    }
  });

  app.use('/especialidades', (req, res, next) => {
    try {
      if (req.method === 'GET') {
        res.sendData({ message: especialidades });
      }
    } catch (e) {
      res.status(418).send({ error: 'Las teteras no tienen especialidades.' });
      next(e);
    }
  });

  app.use('/turnos', (req, res, next) => {
    try {
      if (req.method === 'GET') {
        res.sendData({ message: turnos });
      }
    } catch (e) {
      res.status(418).send({ error: 'Las teteras no tienen turnos.' });
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
