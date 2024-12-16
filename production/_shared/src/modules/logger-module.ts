export const LoggerOptions = {
  pinoHttp: {
    transport: {
      target: "pino-pretty",
      options: {
        singleLine: true
      }
    }
  }
}