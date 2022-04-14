import * as winston from 'winston';

const loggerWinston = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'info.log'
    })
  ]
});
if (process.env.NODE_ENV !== 'production') {
  loggerWinston.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
export const logger = {
  info: (path: string, method: string, controllerName: string, email: string) => loggerWinston.info(`${path}, ${method}, ${controllerName}, ${email},${new Date()}`),
  log: (message: string, data?: any) => {
    if(data){
      loggerWinston.info({ message, data, Date: new Date() });
    }else {
      loggerWinston.info(`${message}- ${new Date()}`);
    }
  },
  error: (message: string, err?: any) => {
    if (err) {
      loggerWinston.error({ message, Date: new Date(), err });
    } else {
      loggerWinston.error(`${message}- ${new Date()}`);
    }
  }
};