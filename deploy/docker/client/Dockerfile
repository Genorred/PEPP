FROM node:20.16.0-alpine

WORKDIR /usr/app

ARG SERVER_API_BASE_URL
ARG NEXT_PUBLIC_GOOGLE_AUTH_URL
ARG NEXT_PUBLIC_API_BASE_URL

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g pnpm

WORKDIR /usr/app/client

COPY ./package.json ./package.json

COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY ./ .

RUN ["pnpm", "run", "build"]

VOLUME [ "/usr/app/client/node_modules", "/usr/app/client/.next" ]

EXPOSE 3000

CMD ["pnpm", "run", "start"]
