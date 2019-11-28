const { Router } = require('express');
const turnoService = require('../services/turno.service');

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.sendData(turnoService.getAll());
  } catch (e) {
    res.status(418).send(e);
    next(e);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    res.sendData(turnoService.get(req.params.id));
  } catch (e) {
    res.status(404).send(e);
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log('entre');
    console.log(req.body);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendData(await turnoService.agregar(req.body));
  } catch (e) {
    res.status(500).send('Envie un turno valido');
    next(e);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.sendData(turnoService.eliminar(req.params.id));
  } catch (e) {
    res.status(404).send(e);
    next(e);
  }
});

module.exports = router;
