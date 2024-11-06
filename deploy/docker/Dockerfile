FROM node:20.16.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG SERVICE_NAME
ENV SERVICE_NAME=$SERVICE_NAME

RUN corepack enable
RUN pnpm config set store-dir /pnpm/store

FROM base AS build

WORKDIR /usr/app
COPY ./${SERVICE_NAME} ./${SERVICE_NAME}
COPY ./tsconfig.run.json ./tsconfig.json
COPY ./shared/src ./${SERVICE_NAME}/src/shared

WORKDIR /usr/app/${SERVICE_NAME}

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN if [ "$SERVICE_NAME" != "gateway" ]; then \
    npx prisma generate; \
    fi

RUN npx nest build

FROM base AS prod
ENV NODE_ENV=production

COPY ./${SERVICE_NAME} ./
COPY --from=build /usr/app/${SERVICE_NAME}/dist ./dist
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod
RUN if [ "$SERVICE_NAME" != "gateway" ]; then \
    npx prisma generate; \
    fi
VOLUME [ "/usr/app/${SERVICE_NAME}/node_modules" ]

COPY ./shared/scripts ./scripts

EXPOSE 8080
CMD ["./scripts/prod.sh"]
