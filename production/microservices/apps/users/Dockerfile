FROM node:20.16.0

WORKDIR /core

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY prisma prisma

RUN pnpm dlx prismaDb generate

COPY . .


CMD ["pnpm", "run", "start:dev"]
