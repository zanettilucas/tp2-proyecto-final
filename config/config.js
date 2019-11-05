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

const config = {
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
  email: {
    from: process.env.EMAIL_FROM || 'notificaciones@hospitalito.com',
    smtp: {
      host: process.env.EMAIL_SMTP_HOST || 'smtp.mailtrap.io',
      port: parseParamInt(process.env.EMAIL_SMTP_PORT, 587),
      secure: parseParamBoolean(process.env.EMAIL_SMTP_SECURE, false),
      auth: {
        user: process.env.EMAIL_SMTP_AUTH_USER || 'e1f12f0b7b00ad',
        pass: process.env.EMAIL_SMTP_AUTH_PASS || 'a09bf3cd878c52',
      },
    },
  },
};

module.exports = config;
