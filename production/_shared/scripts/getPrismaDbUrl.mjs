import fs from "node:fs";

const serviceName = String(process.env.SERVICE_NAME).toUpperCase();

const databaseUrl = `postgresql://${process.env[`${serviceName}_POSTGRES_USER`]}:${process.env[`${serviceName}_POSTGRES_PASSWORD`]}@${process.env[`${serviceName}_POSTGRES_HOST`]}:5432/${process.env[`${serviceName}_POSTGRES_DB`]}?schema=public`;
fs.writeFileSync(".env", `DATABASE_URL=${databaseUrl}`);