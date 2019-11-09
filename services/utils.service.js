const distanceService = require('../services/distance.service');

const medicos = [
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
  const pacientes = [
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



function obtenerUbicacionMedico(idMedico) {
    // fs.readFile('./data/medicos.json', (err, data) => {
    //   if (err) throw err;
    //   const medicos = JSON.parse(data);
    //   console.log(medicos.ubicacion);
    // });
    const { ubicacion } = medicos.find((x) => x.id === idMedico);
    return ubicacion;
  }

  function obtenerUbicacionPaciente(idPaciente) {
    // fs.readFile('./data/medicos.json', (err, data) => {
    //   if (err) throw err;
    //   const medicos = JSON.parse(data);
    //   console.log(medicos.ubicacion);
    // });
    const { ubicacion } = pacientes.find((x) => x.id === idPaciente);
    return ubicacion;
  }

  const calcularDistanciaMP = async (pacienteId, medicoId) => {
    const ubicacionPaciente = obtenerUbicacionPaciente(pacienteId);
    const ubicacionMedico = obtenerUbicacionMedico(medicoId);
    const distanciaYDuracion = await distanceService.calcularDistancia(ubicacionPaciente, ubicacionMedico);
    return distanciaYDuracion;
  };

  const medicosPorDistancia = async (pacienteId) => {
    const arrayDistancia = [];
    medicos.forEach((medico) => {
      const distancia = calcularDistanciaMP(pacienteId, medico.id);
      arrayDistancia.push(distancia);
    });
    return arrayDistancia;
  };

  module.exports = {
    calcularDistanciaMP,
    medicosPorDistancia,
  };