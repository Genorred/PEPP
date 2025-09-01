#!/bin/bash
if [ "$SERVICE_NAME" != "gateway" ]; then
  cd apps/$SERVICE_NAME
  node ../../libs/scripts/getPrismaDbUrl.mjs
  cd ../..
  pnpm --filter $SERVICE_NAME exec prisma db push
fi

echo $SERVICE_NAME
pnpm --filter $SERVICE_NAME run start:prod

