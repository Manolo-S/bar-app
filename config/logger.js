var winston = require('winston');
var Mail = require('winston-mail').Mail;
var Sentry = require('winston-sentry');

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({level: 'silly'}),
        new Sentry({
                level: 'warn',
                dsn: 'https://0618d43745a14fd38b0210716d87aa85:bee69660a12140e0813e4c331287a3d5@app.getsentry.com/83386'
        })
    ],
});

module.exports = logger;