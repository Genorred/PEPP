FROM node:20.16.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG SERVICE_NAME
ENV SERVICE_NAME=$SERVICE_NAME
RUN npm i -g pnpm

FROM base as build

ENV NODE_ENV=development
WORKDIR /usr/app

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY ./libs/shared/package.json ./libs/shared/package.json
COPY ./apps/${SERVICE_NAME}/package.json ./apps/${SERVICE_NAME}/package.json

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

VOLUME [ "/usr/app/apps/${SERVICE_NAME}/node_modules" ]
VOLUME [ "/usr/app/apps/${SERVICE_NAME}/dist" ]
VOLUME [ "/usr/app/libs/shared/node_modules" ]
VOLUME [ "/usr/app/node_modules" ]

COPY ./libs ./libs
COPY ./apps/${SERVICE_NAME} ./apps/${SERVICE_NAME}
EXPOSE 8080

RUN sh libs/scripts/build.sh $SERVICE_NAME

HEALTHCHECK --interval=10s --timeout=5s --retries=100 CMD ["node", "libs/scripts/healthCheck.js"]

CMD ["sh", "libs/scripts/prod.sh"]
