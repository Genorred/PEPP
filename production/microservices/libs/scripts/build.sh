#!/bin/bash
if [ "$SERVICE_NAME" != "gateway" ]; then
  cd apps/$SERVICE_NAME
    node ../../libs/scripts/getPrismaDbUrl.mjs
    pnpm dlx prisma generate
    cd ../..
fi

pnpm --filter $SERVICE_NAME run build