FROM node:20.16.0-alpine

WORKDIR /usr/app

ARG SERVER_API_BASE_URL
ARG NEXT_PUBLIC_API_BASE_URL

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_GOOGLE_AUTH_URL=$NEXT_PUBLIC_GOOGLE_AUTH_URL
ENV SERVER_API_BASE_URL=$SERVER_API_BASE_URL

RUN npm i -g pnpm

WORKDIR /usr/app/client

COPY ./package.json ./package.json

COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

COPY ./ .

RUN ["pnpm", "run", "build"]

VOLUME [ "/usr/app/client/node_modules", "/usr/app/client/.next" ]

EXPOSE 3000

CMD ["pnpm", "run", "start"]
