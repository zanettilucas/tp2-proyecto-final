require('dotenv').config();
const path = require('path');

const rootPath = path.normalize(`${__dirname}/..`);
const env = process.env.NODE_ENV || 'development';

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

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'MaxRetail',
    },
    port: process.env.PORT || 3000,
    secret: process.env.SECRET || 'asdñkfjp0934u5ovnfap09u240nrgfe',
    sessionPath: process.env.SESSION_PATH || './var/sessions',
    db: {
      database: process.env.DB_NAME || 'test',
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      dialect: 'mysql',
      define: {
        timestamps: false,
      },
      logging: process.env.DB_LOGGING || false,
    },
    cms: {
      url: process.env.CMS_URL || 'localhost',
      username: process.env.CMS_USER || 'root',
      password: process.env.CMS_PASS || 'root',
    },
    pedidoCarga: {
      modo: process.env.PEDIDO_CARGA_MODO || 'colectivo',
      agrupador: process.env.PEDIDO_CARGA_AGRUPADOR || 'marca',
    },
    supportEmail: process.env.SUPPORT_EMAIL || 'support@mail.com',
    email: {
      from: process.env.EMAIL_FROM || 'notifications@mail.com',
      smtp: {
        host: process.env.EMAIL_SMTP_HOST || 'localhost',
        port: parseParamInt(process.env.EMAIL_SMTP_PORT, 587),
        secure: parseParamBoolean(process.env.EMAIL_SMTP_SECURE, false),
        auth: {
          user: process.env.EMAIL_SMTP_AUTH_USER || 'user',
          pass: process.env.EMAIL_SMTP_AUTH_PASS || 'pass',
        },
      },
    },
  },

  test: {
    root: rootPath,
    app: {
      name: 'MR test',
    },
    port: process.env.PORT || 3000,
    secret: process.env.SECRET || '',
    sessionPath: process.env.SESSION_PATH || './var/sessions',
    db: {
      database: process.env.DB_NAME || 'test',
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      dialect: 'mysql',
      define: {
        timestamps: false,
      },
      logging: process.env.DB_LOGGING || false,
    },
    cms: {
      url: process.env.CMS_URL || 'localhost',
      username: process.env.CMS_USER || 'root',
      password: process.env.CMS_PASS || 'root',
    },
    pedidoCarga: {
      modo: process.env.PEDIDO_CARGA_MODO || 'colectivo',
      agrupador: process.env.PEDIDO_CARGA_AGRUPADOR || null,
    },
    supportEmail: process.env.SUPPORT_EMAIL || 'support@mail.com',
    email: {
      from: process.env.EMAIL_FROM || 'notifications@mail.com',
      smtp: {
        host: process.env.EMAIL_SMTP_HOST || 'localhost',
        port: parseParamInt(process.env.EMAIL_SMTP_PORT, 587),
        secure: parseParamBoolean(process.env.EMAIL_SMTP_SECURE, false),
        auth: {
          user: process.env.EMAIL_SMTP_AUTH_USER || 'user',
          pass: process.env.EMAIL_SMTP_AUTH_PASS || 'pass',
        },
      },
    },
  },

  production: {
    root: rootPath,
    app: {
      name: 'MaxRetail',
    },
    port: process.env.PORT || 3000,
    secret: process.env.SECRET || 'asdñkfjp0934u5ovnfap09u240nrgfe',
    sessionPath: process.env.SESSION_PATH || './var/sessions',
    db: {
      database: process.env.DB_NAME || 'test',
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      dialect: 'mysql',
      define: {
        timestamps: false,
      },
      logging: process.env.DB_LOGGING || false,
    },
    cms: {
      url: process.env.CMS_URL || 'localhost',
      username: process.env.CMS_USER || 'root',
      password: process.env.CMS_PASS || 'root',
    },
    pedidoCarga: {
      modo: process.env.PEDIDO_CARGA_MODO || 'colectivo',
      agrupador: process.env.PEDIDO_CARGA_AGRUPADOR || null,
    },
    supportEmail: process.env.SUPPORT_EMAIL || 'support@mail.com',
    email: {
      from: process.env.EMAIL_FROM || 'notifications@mail.com',
      smtp: {
        host: process.env.EMAIL_SMTP_HOST || 'localhost',
        port: parseParamInt(process.env.EMAIL_SMTP_PORT, 587),
        secure: parseParamBoolean(process.env.EMAIL_SMTP_SECURE, false),
        auth: {
          user: process.env.EMAIL_SMTP_AUTH_USER || 'user',
          pass: process.env.EMAIL_SMTP_AUTH_PASS || 'pass',
        },
      },
    },
  },
};

module.exports = config[env];
