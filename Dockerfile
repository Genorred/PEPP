FROM node:20.16.0

WORKDIR /core

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN #pnpm run build

CMD ["pnpm", "run", "dev"]