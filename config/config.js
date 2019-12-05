require('dotenv').config();

const parseParamBoolean = (envValue, defaultValue) => {
  if (envValue === undefined || envValue === null) {
    return defaultValue;
  }
  return envValue.toLowerCase() === 'true' || envValue === '1';
};

const parseParamInt = (envValue, defaultValue) => {
  if (envValue === undefined || envValue === null) {
    return defaultValue;
  }
  return parseInt(envValue, 10);
};

const env = process.env.NODE_ENV || 'test';

const config = {
  prod: {
    port: process.env.PORT || 3000,
    // db: {
    //   database: process.env.DB_NAME || 'test',
    //   host: process.env.DB_HOST || 'localhost',
    //   username: process.env.DB_USER || 'root',
    //   password: process.env.DB_PASS || 'root',
    //   dialect: 'mysql',
    //   define: {
    //     timestamps: false,
    //   },
    //   logging: process.env.DB_LOGGING || false,
    // },
    data: process.env.data || './data/',
    email: {
      from: process.env.EMAIL_FROM || 'tp2.centro.medico.tp2@gmail.com',
      smtp: {
        host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
        port: parseParamInt(process.env.EMAIL_SMTP_PORT, 587),
        secure: parseParamBoolean(process.env.EMAIL_SMTP_SECURE, true),
        auth: {
          user: process.env.EMAIL_SMTP_AUTH_USER || 'tp2.centro.medico.tp2@gmail.com',
          pass: process.env.EMAIL_SMTP_AUTH_PASS || 'adminMedi.tp2',
        },
      },
    },
  },
  test: {
    port: process.env.PORT || 3000,
    // db: {
    //   database: process.env.DB_NAME || 'test',
    //   host: process.env.DB_HOST || 'localhost',
    //   username: process.env.DB_USER || 'root',
    //   password: process.env.DB_PASS || 'root',
    //   dialect: 'mysql',
    //   define: {
    //     timestamps: false,
    //   },
    //   logging: process.env.DB_LOGGING || false,
    // },
    data: process.env.data || './dataTest/',
    email: {
      from: process.env.EMAIL_FROM || 'tp2.centro.medico.tp2@gmail.com',
      smtp: {
        host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
        port: parseParamInt(process.env.EMAIL_SMTP_PORT, 587),
        secure: parseParamBoolean(process.env.EMAIL_SMTP_SECURE, true),
        auth: {
          user: process.env.EMAIL_SMTP_AUTH_USER || 'tp2.centro.medico.tp2@gmail.com',
          pass: process.env.EMAIL_SMTP_AUTH_PASS || 'adminMedi.tp2',
        },
      },
    },
  },
};

module.exports = config[env];
