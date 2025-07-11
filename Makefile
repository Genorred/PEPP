SHELL := /bin/bash
ifneq (,$(wildcard ./.env))
    include config/.env
    export
endif

build-all: setup_env
	node tools/build.js | tee build.log

setup_env:
	set -a
	source config/.env

dev-up: setup_env
	docker-compose -f deploy/docker/docker-compose.dev.yml --env-file ./config/.env.dev up

dev-build-up: setup_env
	docker-compose -f deploy/docker/docker-compose.dev.yml --env-file ./config/.env.dev up --build

dev-down: setup_env
	docker-compose -f deploy/docker/docker-compose.dev.yml --env-file ./config/.env.dev down -v --remove-orphans

prod-build-up: setup_env
	docker-compose -f deploy/docker/docker-compose.yml --env-file ./config/.env up --build

prod-up: setup_env
	docker-compose -f deploy/docker/docker-compose.yml --env-file ./config/.env up

prod-down: setup_env
	docker-compose -f deploy/docker/docker-compose.yml --env-file ./config/.env down -v --remove-orphans

test-build-up: setup_env
	docker-compose -f deploy/docker/docker-compose.test.yml --env-file ./config/.env.test up --build

test-up: setup_env
	docker-compose -f deploy/docker/docker-compose.test.yml --env-file ./config/.env.test up

test-down: setup_env
	docker-compose -f deploy/docker/docker-compose.test.yml --env-file ./config/.env.test down -v --remove-orphans
