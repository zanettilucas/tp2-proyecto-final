import { request } from "http";

describe('GET /medico/:medicoId/paciente/:pacienteId', function () {
    it('caso feliz', function(done) {
        request(app)
            .get('/medico/1/paciente/4')
            .expect(200, done);
    });

    it('caso triste', function(done) {
        request(app)
            .get('/medico/99/paciente/55')
            .expect(418)
            .end(function (err,res){
                done();
            });
    });
});