module.exports = function (sequelize, Sequelize) {
  const Paciente = sequelize.define('paciente', {
    dni: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    nombrePaciente: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    apellidoPaciente: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    emailPaciente: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },

    distanciaPaciente: {
      type: Sequelize.TEXT,
    },
  });

  return Paciente;
};
