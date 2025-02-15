#!/bin/bash
if [ "$SERVICE_NAME" != "gateway" ]; then
  cd apps/$SERVICE_NAME
    node ../../libs/scripts/getPrismaDbUrl.mjs
    pnpm dlx prisma db push
    cd ../..
fi

pnpm --filter $SERVICE_NAME run start:dev
