const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const { expect } = chai;


chai.use(chaiHttp);

describe('/GET medicos?especialidad=Clinico&limit=2', () => {
  it('Medicos filtrados por especialidad ', (done) => {
    chai.request(server)
      .get('/medicos?especialidad=Clinico&limit=2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data').to.be.lengthOf(2);
        done();
      });
  });
});

describe('/GET /medicos?especialidad=pruebamala&limit=2', () => {
  it('Devuelve error', (done) => {
    chai.request(server)
      .get('/medicos?especialidad=pruebamala&limit=2')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('data').to.be.equal('Especialidad no valida');
        done();
      });
  });
});

describe('/GET /medicos?pacienteId=1&distanceMax=1000', () => {
  it('Medicos por distancia desde un paciente.', (done) => {
    chai.request(server)
      .get('/medicos?pacienteId=1&distanceMax=1000')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data').to.be.lengthOf(1);
        expect(res.body).to.have.property('data').to.be.eql([
          {
            distance: {
              distance: { text: '0.8 km', value: 841 },
              duration: { text: '4 mins', value: 257 },
              status: 'OK',
            },
            m: {
              id: 4,
              legajo: 4,
              nombre: 'Anita',
              apellido: 'Lapalatina',
              especialidad: 'Clinico',
              ubicacion: '-34.6020826, -58.4314074',
              mail: 'zanettilucas93@gmail.com',
            },
          },
        ]);
        done();
      });
  });
});

describe('/GET /medicos?pacienteId=9999&distanceMax=1000', () => {
  it('Devuelve error', (done) => {
    chai.request(server)
      .get('/medicos?pacienteId=9999&distanceMax=1000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('data').to.be.equal('Paciente no encontrado');
        done();
      });
  });
});
describe('/GET /medicos', () => {
  it('Devuelve todos los medicos.', (done) => {
    chai.request(server)
      .get('/medicos')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('/GET /pacientes/1/sugerencias?especialidad=Clinico&limit=1', () => {
  it('Sugerencias de medico más cercano para paciente según especialidad.', (done) => {
    chai.request(server)
      .get('/pacientes/1/sugerencias?especialidad=Clinico&limit=1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data').to.be.lengthOf(1);
        expect(res.body).to.have.property('data').to.be.eql([
          {
            distance: {
              distance: { text: '0.8 km', value: 841 },
              duration: { text: '4 mins', value: 257 },
              status: 'OK',
            },
            medico: {
              id: 4,
              legajo: 4,
              nombre: 'Anita',
              apellido: 'Lapalatina',
              especialidad: 'Clinico',
              ubicacion: '-34.6020826, -58.4314074',
              mail: 'zanettilucas93@gmail.com',
            },
          },
        ]);
        done();
      });
  });
});

describe('/GET /pacientes/1/sugerencias?especialidad=calesita&limit=1', () => {
  it('Devuelve error', (done) => {
    chai.request(server)
      .get('/pacientes/1/sugerencias?especialidad=calesita&limit=1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('data').to.be.equal('especialidad no valida');
        done();
      });
  });
});
/*

describe('/GET Especialidades Ok', () => {
  it('Devuelve especialidades', (done) => {
    chai.request(server)
      .get('/medicos/especialidades')
      .end((err, res) => {
        expect(res).to.have.status(200);
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
        expect(res).to.have.status(201);
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
        expect(res).to.have.status(418);
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
        expect(res).to.have.status(201);
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
        expect(res).to.have.status(400);
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
        expect(res).to.have.status(200);
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
        expect(res).to.have.status(404);
        done();
      });
  });
});
*/
