if [ "$SERVICE_NAME" != "gateway" ]; then
    node scripts/getPrismaDbUrl.mjs
    npx prisma db push
fi

pnpm run start:prod
