const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, simple } = format;
const dateNow = new Date();

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
  
const logger = createLogger({
    format: combine(
        timestamp({ format: () => {
        return dateNow.toLocaleString();
      }}),
        myFormat,
        simple()
      ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logger/error.log' })
    ]
  });

module.exports= logger;