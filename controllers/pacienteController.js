const { Router } = require('express');

const pacientesArchivo = './data/pacientes.json';
const fs = require('fs');
const usuarioService = require('../services/usuario.service');
const mailerService = require('../services/mailer.service.js');

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
      res.status(400).send({ error: 'el paciente ya existe.' });
    }
  } catch (e) {
    res.status(418).send({ error: 'no se pudo agregar el paciente.' });
    next(e);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    if (usuarioService.eliminarUsuario(req.params.id, pacientesArchivo)) {
      res.status(200).json('Paciente Eliminado');
    } else {
      res.status(400).send({ error: 'el paciente ya existe.' });
    }
  } catch (e) {
    res.status(418).send({ error: 'no se pudo eliminar el paciente.' });
    next(e);
  }
});

router.post('/turno', (req, res, next) => {
  try {
    const nuevoTurno = req.body;
    const turnos = JSON.parse(fs.readFileSync('./data/turnos.json'));
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
  } catch (e) {
    res.status(418).send({ error: 'no se pudo agregar el paciente.' });
    next(e);
  }
});

module.exports = router;
