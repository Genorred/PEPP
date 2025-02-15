import fs from "node:fs";

const serviceName = String(process.env.SERVICE_NAME);
const UppercasedServiceName = serviceName.toUpperCase();

const databaseUrl = `postgresql://${process.env[`${UppercasedServiceName}_POSTGRES_USER`]}:${process.env[`${UppercasedServiceName}_POSTGRES_PASSWORD`]}@${process.env[`${UppercasedServiceName}_POSTGRES_HOST`]}:5432/${process.env[`${UppercasedServiceName}_POSTGRES_DB`]}?schema=public`;
fs.writeFileSync(`apps/${serviceName}/.env`, `DATABASE_URL=${databaseUrl}`);