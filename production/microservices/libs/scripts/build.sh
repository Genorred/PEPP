#!/bin/bash
if [ "$SERVICE_NAME" != "gateway" ]; then
  cd apps/$SERVICE_NAME
  node ../../libs/scripts/getPrismaDbUrl.mjs
  cd ../..
  pnpm --filter $SERVICE_NAME exec prisma generate
fi

pnpm --filter $SERVICE_NAME run build

