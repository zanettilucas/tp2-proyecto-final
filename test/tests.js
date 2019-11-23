const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const usuario = require('../services/usuario.service');

const should = chai.should();

chai.use(chaiHttp);

describe('/GET medicos/distancia/paciente Ok', () => {
  it('Medicos más cercanos ordenados del paciente', (done) => {
    chai.request(server)
      .get('/medicos/distancia/paciente')
      .query({ pacienteId: 2 })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/GET medicos/distancia/paciente Fail', () => {
  it('Devuelve error', (done) => {
    chai.request(server)
      .get('/medicos/distancia/paciente')
      .query({ pacienteId: 300 })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('/GET Especialidades Ok', () => {
  it('Devuelve especialidades', (done) => {
    chai.request(server)
      .get('/medicos/especialidades')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/POST pacientes/turno Ok', () => {
  it('Turno agregado', (done) => {
    chai.request(server)
      .post('/pacientes/turno')
      .send({
        dia: 'Viernes 29', hora: '16:05 pm', medicoId: 4, pacienteId: 3,
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        done();
      });
  });
});


describe('/POST pacientes/turno Fail medico ocupado', () => {
  it('Devuelve error', (done) => {
    chai.request(server)
      .post('/pacientes/turno')
      .send({
        dia: 'Viernes 29', hora: '16:05 pm', medicoId: 4, pacienteId: 3,
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(418);
        done();
      });
  });
});

describe('/POST pacientes/turno Fail medico inexistente', () => {
  it('Devuelve error', (done) => {
    chai.request(server)
      .post('/pacientes/turno')
      .send({
        dia: 'Viernes 29', hora: '16:05 pm', medicoId: 999, pacienteId: 4,
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(418);
        done();
      });
  });
});

describe('/POST pacientes/turno Fail paciente inexistente', () => {
  it('Devuelve error', (done) => {
    chai.request(server)
      .post('/pacientes/turno')
      .send({
        dia: 'Viernes 29', hora: '16:05 pm', medicoId: 3, pacienteId: 787878,
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(418);
        done();
      });
  });
});

describe('/POST pacientes Ok', () => {
  it('paciente agregado', (done) => {
    chai.request(server)
      .post('/pacientes')
      .send({
        dni: 36949535,
        id: 36949535,
        nombre: 'Gonzalo',
        apellido: 'Merlo',
        ubicacion: '-34.606294, -58.4282253',
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        done();
      });
  });
});

describe('/POST pacientes fail', () => {
  it('el paciente ya existe', (done) => {
    chai.request(server)
      .post('/pacientes')
      .send({
        dni: 1,
        id: 1,
        nombre: 'Mariano',
        apellido: 'Aquino',
        ubicacion: '-34.606294, -58.4282253',
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(400);
        done();
      });
  });
});

describe('/DELETE pacientes/:id Ok', () => {
  it('Paciente eliminado', (done) => {
    const id = 36949535;
    chai.request(server)
      .delete(`/pacientes/${id}`)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        done();
      });
  });
});

describe('/DELETE pacientes/:id fail', () => {
  it('el paciente no existe', (done) => {
    const id = 9999999;
    chai.request(server)
      .delete(`/pacientes/${id}`)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(404);
        done();
      });
  });
});
