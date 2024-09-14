import winston from "winston";

const rootLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const apiLogger = rootLogger.child({ name: "api" });
export const serviceLogger = rootLogger.child({ name: "service" });
export const logger = rootLogger.child({ name: "app.server" });
