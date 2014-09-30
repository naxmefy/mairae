module.exports = {
  env: process.env.NODE_ENV || "development",
  mongodb: "mongodb://localhost/mairae",
  mongodb_max_retries: 5,
  security: {
    secret: "Z283HPPc2N0ZL5iNf2kR8ihEB3apEoMv",
    salt_factor: 10,
    token_duration_in_days: 2
  },
  cookie: {
    secret: 'N9o7tV2qSQ91UwZ0O7tgVl3q5vZ0017l',
    auth: {
      secure: true
    }
  },
  mailer: {
  }
};