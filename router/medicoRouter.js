/* const { Router } = require('express');

const medicosArchivo = './data/medicos.json';
const fs = require('fs');
const usuarioService = require('../helper/dao.helper');
const distanceService = require('../services/distance.service');

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.sendData({ message: usuarioService.getUsuarios(medicosArchivo) });
  } catch (e) {
    res.status(418).send({ error: 'Las teteras no tienen medicos.' });
    next(e);
  }
});

router.get('/especialidades', (req, res, next) => {
  try {
    res.sendData({ message: JSON.parse(fs.readFileSync('./data/especialidades.json')) });
  } catch (e) {
    res.status(418).send({ error: 'Las teteras no tienen especialidades.' });
    next(e);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const medico = usuarioService.getUsuario(req.params.id, medicosArchivo);
    if (medico) {
      res.sendData({
        message: medico,
      });
    }
    res.status(404).send({ message: 'No está el médico buscado' });
  } catch (e) {
    res.status(500).send({ error: 'Hubo un error al traer medicos' });
    next(e);
  }
});

router.post('/', (req, res, next) => {
  try {
    const nuevoMedico = req.body;
    nuevoMedico.id = nuevoMedico.legajo;
    if (usuarioService.agregarUsuario(nuevoMedico, medicosArchivo)) {
      res.status(201).json(nuevoMedico);
    } else {
      res.status(400).send({ error: 'El medico ya existe.' });
    }
  } catch (e) {
    res.status(418).send({ error: 'No se pudo agregar el medico.' });
    next(e);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    if (usuarioService.eliminarUsuario(req.params.id, medicosArchivo)) {
      res.status(200).json('Medico Eliminado');
    } else {
      res.status(204).send({ error: 'No se encuentra el id de médico para eliminar.' });
    }
  } catch (e) {
    res.status(418).send({ error: 'No se pudo eliminar el medico.' });
    next(e);
  }
});

router.get('/distancia/paciente', async (req, res, next) => {
  try {
    let listadoMedicos = await distanceService.medicosYDistancia(parseInt(req.query.pacienteId, 10));
    if (listadoMedicos[0] === 'Error obteniendo ubicación') {
      throw new Error(listadoMedicos[0]);
    }
    listadoMedicos = listadoMedicos.sort((d1, d2) => d1.distance.value - d2.distance.value);
    res.sendData({ message: listadoMedicos });
  } catch (e) {
    res.status(404).send({ error: 'El paciente no existe' });
    next(e);
  }
});

router.get('/:medicoId/paciente/:pacienteId', async (req, res, next) => {
  try {
    const distanciaYDuracion = await distanceService.calcularDistanciaMP(parseInt(req.params.pacienteId, 10), parseInt(req.params.medicoId, 10));
    res.sendData({ message: distanciaYDuracion });
  } catch (e) {
    res.status(418).send({ error: 'Las teteras no calculan distancias.' });
    next(e);
  }
});


module.exports = router;
*/
const { Router } = require('express');
const medicoService = require('../services/medico.service');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.query.especialidad) {
      const medicos = medicoService.listadoPorEspecialidad(req.query);
      if (medicos !== 'Especialidad no valida') {
        return res.sendData(medicos);
      }
      return res.status(404).send(medicos);
    }
    if (req.query.pacienteId) {
      const medicos = await medicoService.getDistanciaMedicosPorPaciente(req.query);
      if (medicos !== 'Paciente no encontrado') {
        return res.sendData(medicos);
      }
      return res.status(404).send(medicos);
    }
    res.sendData(medicoService.getAll());
  } catch (e) {
    res.status(418).send(e);
    next(e);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    res.sendData(medicoService.get(req.params.id));
  } catch (e) {
    res.status(404).send(e);
    next(e);
  }
});

router.post('/', (req, res, next) => {
  try {
    res.sendData(medicoService.agregar(req.body));
  } catch (e) {
    res.status(500).send(e);
    next(e);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.sendData(medicoService.eliminar(req.params.id));
  } catch (e) {
    res.status(404).send(e);
    next(e);
  }
});

module.exports = router;
