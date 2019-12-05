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
        expect(res.body).to.have.property('data').to.be.eql([
          {
            id: 1,
            legajo: 1,
            nombre: 'Juan',
            apellido: 'perez',
            especialidad: 'Clinico',
            ubicacion: '-34.6071383,-58.4257513',
            mail: 'zanettilucas93@gmail.com',
          },
          {
            id: 2,
            legajo: 2,
            nombre: 'Rey',
            apellido: 'del Sol',
            especialidad: 'Clinico',
            ubicacion: '-34.5943513,-58.4439676',
            mail: 'zanettilucas93@gmail.com',
          },
        ]);
        done();
      });
  });
});

describe('/GET /medicos?especialidad=Carpintero&limit=2', () => {
  it('Medicos filtrados con especialidad erronea(error)', (done) => {
    chai.request(server)
      .get('/medicos?especialidad=Carpintero&limit=2')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('msg').to.be.equal('Especialidad no encontrada.');
        done();
      });
  });
});

describe('/GET /medicos?especialidad=Cardiologo&limit=2', () => {
  it('Medicos filtrados con especialidad valida en la que no hay medicos(error)', (done) => {
    chai.request(server)
      .get('/medicos?especialidad=Cardiologo&limit=2')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('msg').to.be.equal('No hay medicos con esa especialidad.');
        done();
      });
  });
});

describe('/GET /medicos?especialidad=Clinico&limit=0', () => {
  it('Medicos filtrados con limite 0(error)', (done) => {
    chai.request(server)
      .get('/medicos?especialidad=Clinico&limit=0')
      .end((err, res) => {
        expect(res).to.have.status(410);
        expect(res.body).to.have.property('msg').to.be.equal('El limite no puede ser 0.');
        done();
      });
  });
});

describe('/GET /medicos?pacienteId=1&distanceMax=10000', () => {
  it('Distancias y medicos filtrados por distancia de un paciente.', (done) => {
    chai.request(server)
      .get('/medicos?pacienteId=1&distanceMax=10000')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data').to.be.eql([
          {
            distance: {
              distance: {
                text: '1.5 km',
                value: 1485,
              },
              duration: {
                text: '5 mins',
                value: 320,
              },
              status: 'OK',
            },
            medico: {
              id: 1,
              legajo: 1,
              nombre: 'Juan',
              apellido: 'perez',
              especialidad: 'Clinico',
              ubicacion: '-34.6071383,-58.4257513',
              mail: 'zanettilucas93@gmail.com',
            },
          },
          {
            distance: {
              distance: {
                text: '4.8 km',
                value: 4808,
              },
              duration: {
                text: '15 mins',
                value: 897,
              },
              status: 'OK',
            },
            medico: {
              id: 2,
              legajo: 2,
              nombre: 'Rey',
              apellido: 'del Sol',
              especialidad: 'Clinico',
              ubicacion: '-34.5943513,-58.4439676',
              mail: 'zanettilucas93@gmail.com',
            },
          },
        ]);
        done();
      });
  });
});

describe('/GET /medicos?pacienteId=9999&distanceMax=10000', () => {
  it('Distancias y medicos filtrados por distancia de un paciente que no existe.(error)', (done) => {
    chai.request(server)
      .get('/medicos?pacienteId=9999&distanceMax=10000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('msg').to.be.equal('Paciente no encontrado.');
        done();
      });
  });
});

describe('/GET /medicos?pacienteId=1&distanceMax=0', () => {
  it('Distancias y medicos filtrados por distancia de un paciente con distancia máxima de 0.(error)', (done) => {
    chai.request(server)
      .get('/medicos?pacienteId=1&distanceMax=0')
      .end((err, res) => {
        expect(res).to.have.status(410);
        expect(res.body).to.have.property('msg').to.be.equal('La distancia máxima no puede ser 0.');
        done();
      });
  });
});

describe('/GET /medicos?pacienteId=1&distanceMax=1000', () => {
  it('Distancias y medicos filtrados por distancia de un paciente con distancia que excluye a todos los medicos posibles.(error)', (done) => {
    chai.request(server)
      .get('/medicos?pacienteId=1&distanceMax=1000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('msg').to.be.equal('No se encuentran medicos tan cercanos, amplifique la distancia maxima.');
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
  it('Sugerencias de medicos más cercanos para paciente según especialidad limitando a 1.', (done) => {
    chai.request(server)
      .get('/pacientes/1/sugerencias?especialidad=Clinico&limit=1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data').to.be.lengthOf(1);
        expect(res.body).to.have.property('data').to.be.eql([
          {
            distance: {
              distance: {
                text: '1.5 km',
                value: 1485,
              },
              duration: {
                text: '5 mins',
                value: 320,
              },
              status: 'OK',
            },
            medico: {
              id: 1,
              legajo: 1,
              nombre: 'Juan',
              apellido: 'perez',
              especialidad: 'Clinico',
              ubicacion: '-34.6071383,-58.4257513',
              mail: 'zanettilucas93@gmail.com',
            },
          },
        ]);
        done();
      });
  });
});

describe('/GET /pacientes/1/sugerencias?especialidad=carpintero&limit=1', () => {
  it('Sugerencias de medicos más cercanos para paciente según especialidad inexistente limitando a 1.(error)', (done) => {
    chai.request(server)
      .get('/pacientes/1/sugerencias?especialidad=carpintero&limit=1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('msg').to.be.equal('Especialidad no encontrada.');
        done();
      });
  });
});

describe('/GET /pacientes/1/sugerencias?especialidad=Clinico&limit=0', () => {
  it('Sugerencias de medicos más cercanos para paciente según especialidad limitando a 0.(error)', (done) => {
    chai.request(server)
      .get('/pacientes/1/sugerencias?especialidad=Clinico&limit=0')
      .end((err, res) => {
        expect(res).to.have.status(410);
        expect(res.body).to.have.property('msg').to.be.equal('El limite no puede ser 0.');
        done();
      });
  });
});

describe('/GET /pacientes/999/sugerencias?especialidad=Clinico&limit=1', () => {
  it('Sugerencias de medicos más cercanos para paciente inexistente según especialidad limitando a 1.(error)', (done) => {
    chai.request(server)
      .get('/pacientes/999/sugerencias?especialidad=Clinico&limit=1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('msg').to.be.equal('Paciente no encontrado.');
        done();
      });
  });
});

describe('/GET /pacientes/1/sugerencias?especialidad=Cardiologo&limit=1', () => {
  it('Sugerencias de medicos más cercanos para paciente según especialidad que no tiene medicos limitando a 1.(error)', (done) => {
    chai.request(server)
      .get('/pacientes/1/sugerencias?especialidad=Cardiologo&limit=1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('msg').to.be.equal('No hay medicos con esa especialidad.');
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
