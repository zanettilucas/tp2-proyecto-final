const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();

chai.use(chaiHttp);

describe('/GET medicos/paciente/:pacienteId caso feliz', () => {
  it('medicos más cercanos ordenados del paciente', (done) => {
    chai.request(server)
      .get('/medicos/paciente/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/GET medicos/paciente/:pacienteId caso triste', () => {
  it('Devuelve error', (done) => {
    chai.request(server)
      .get('/medicos/paciente/300')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('/POST pacientes/turno caso feliz', () => {
  it('turno agregado', (done) => {
    chai.request(server)
      .post('/pacientes/turno')
      .send({
        dia: 'Lunes 25', hora: '12:05 pm', medicoId: 3, pacienteId: 5,
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        // expect(res).to.have.status(200);
        done();
      });
  });
});

describe('/POST pacientes/turno caso triste', () => {
  it('Devuelve error', (done) => {
    chai.request(server)
      .post('/pacientes/turno')
      .send({
        dia: 'Viernes 29', hora: '16:05 pm', medicoId: 999, pacienteId: 55,
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(418);
        // expect(res).to.have.status(200);
        done();
      });
  });
});
