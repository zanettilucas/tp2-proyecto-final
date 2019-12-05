/* const { Router } = require('express');

const pacientesArchivo = './data/pacientes.json';
const fs = require('fs');
const usuarioService = require('../helper/dao.helper');
const mailerService = require('../services/mailer.service.js');
const turnoService = require('../services/turno.service.js');

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.sendData({ message: usuarioService.getUsuarios(pacientesArchivo) });
  } catch (e) {
    res.status(418).send({ error: 'Las teteras no tienen pacientes.' });
    next(e);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const paciente = usuarioService.getUsuario(req.params.id, pacientesArchivo);
    if (paciente) {
      res.sendData({
        message: paciente,
      });
    }
    res.status(404).send({ message: 'No está el paciente buscado' });
  } catch (e) {
    res.status(500).send({ error: 'Hubo un error al traer pacientes' });
    next(e);
  }
});

router.post('/', (req, res, next) => {
  try {
    const nuevoPaciente = req.body;
    nuevoPaciente.id = nuevoPaciente.dni;
    if (usuarioService.agregarUsuario(nuevoPaciente, pacientesArchivo)) {
      res.status(201).json(nuevoPaciente);
    } else {
      res.status(400).send({ error: 'El paciente ya existe.' });
    }
  } catch (e) {
    res.status(418).send({ error: 'No se pudo agregar el paciente.' });
    next(e);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    if (usuarioService.eliminarUsuario(req.params.id, pacientesArchivo)) {
      res.status(200).json('Paciente Eliminado');
    } else {
      res.status(404).send({ error: 'Paciente no encontrado.' });
    }
  } catch (e) {
    res.status(418).send({ error: 'No se pudo eliminar el paciente.' });
    next(e);
  }
});

router.post('/turno', (req, res, next) => {
  try {
    const nuevoTurno = req.body;
    const turnos = JSON.parse(fs.readFileSync('./data/turnos.json'));
    if (!usuarioService.getUsuario(nuevoTurno.medicoId, './data/medicos.json')) {
      return res.status(418).send({ error: 'El id del medico no existe.' });
    }
    if (!usuarioService.getUsuario(nuevoTurno.pacienteId, './data/pacientes.json')) {
      return res.status(418).send({ error: 'El id del paciente no existe.' });
    }
    if (turnoService.validarDisponibilidad(nuevoTurno, turnos)) {
      turnos.push(nuevoTurno);
      fs.writeFileSync('./data/turnos.json', JSON.stringify(turnos));
      // después traer todo.
      mailerService.sendConfirmOrder({
        paciente: { email: 'zanettilucas93@gmail.com' },
        medico: { email: 'zanettilucas93@gmail.com' },
        codigo: 'turno sarlanga',
        fecha: '10/02/1993',
        horario: '11 am',
      });
      res.status(201).json(nuevoTurno);
    } else {
      res.status(418).send({ error: 'No hay turno disponible con este medico para el día y hora seleccionado' });
    }
  } catch (e) {
    res.status(418).send({ error: 'No se pudo agregar el turno' });
    next(e);
  }
});

module.exports = router;
*/
const { Router } = require('express');
const pacienteService = require('../services/paciente.service');

const router = Router();

router.get('/:id/sugerencias', async (req, res, next) => {
  try {
    res.sendData(await pacienteService.getMedicosYDistanciaPorEspecialidad(req.params.id, req.query));
  } catch (e) {
    res.status(e.status).send(e.desc);
    next(e);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    res.sendData(pacienteService.get(req.params.id));
  } catch (e) {
    res.status(404).send(e);
    next(e);
  }
});

router.get('/', (req, res, next) => {
  try {
    res.sendData(pacienteService.getAll());
  } catch (e) {
    res.status(418).send(e);
    next(e);
  }
});

router.post('/', (req, res, next) => {
  try {
    res.sendData(pacienteService.agregar(req.body));
  } catch (e) {
    res.status(500).send(e);
    next(e);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.sendData(pacienteService.eliminar(req.params.id));
  } catch (e) {
    res.status(404).send(e);
    next(e);
  }
});

module.exports = router;
