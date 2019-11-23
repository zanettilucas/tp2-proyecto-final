const { Router } = require('express');
const especialidadService = require('../services/especialidad.service');

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.sendData(especialidadService.getAll());
  } catch (e) {
    res.status(418).send(e);
    next(e);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    res.sendData(especialidadService.get(req.params.id));
  } catch (e) {
    res.status(404).send(e);
    next(e);
  }
});

router.post('/', (req, res, next) => {
  try {
    res.sendData(especialidadService.agregar(req.body));
  } catch (e) {
    res.status(500).send(e);
    next(e);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.sendData(especialidadService.eliminar(req.params.id));
  } catch (e) {
    res.status(404).send(e);
    next(e);
  }
});

module.exports = router;
