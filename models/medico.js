module.exports = function(sequelize, Sequelize) {
  var Medico = sequelize.define("medico", {
    legajo: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    idespecialidad: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    nombreMedico: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    apellidoMedico: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    emailMedico: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },

    distanciaMedico: {
      type: Sequelize.TEXT
    }
  });

  return Medico;
};
