FROM node:20.16.0-alpine

WORKDIR /usr/app

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . .

WORKDIR /usr/app/client

RUN pnpm config set store-dir /pnpm/store

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

VOLUME [ "/usr/app/client/node_modules", "/usr/app/client/.next" ]

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
