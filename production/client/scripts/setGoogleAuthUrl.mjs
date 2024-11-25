import fs from 'node:fs';

const databaseUrl = process.env.REACT_APP_DATABASE_URL;
fs.writeFileSync('.env', `DATABASE_URL=${databaseUrl}`);
