#!/bin/bash
if [ "$SERVICE_NAME" != "gateway" ]; then
    node ./src/_shared/scripts/getPrismaDbUrl.mjs
    npx prisma db push
fi

pnpm run start:dev