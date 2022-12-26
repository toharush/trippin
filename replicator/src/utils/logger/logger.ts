import winston from 'winston';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message:  info.stack });
  }

  return info;
});
const logFormat = winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`);

export default winston.createLogger({
  level: process.env.NODE_ENV?.includes('development') ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD.MM.YY HH:mm:ss' }),
    winston.format.colorize({ all: true}),
    enumerateErrorFormat(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});
