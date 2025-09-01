SHELL := /bin/bash
ifneq (,$(wildcard ./.env))
    include config/.env
    export
endif

build-all: setup_env
	node tools/build.js | tee build.log

setup_env:
	# set -a
	# source config/.env

dev-up: setup_env
	docker-compose -f deploy/docker/docker-compose.dev.yml --env-file ./config/.env.dev up

dev-build-up: setup_env
	docker-compose -f deploy/docker/docker-compose.dev.yml --env-file ./config/.env.dev up --build

dev-down: setup_env
	docker-compose -f deploy/docker/docker-compose.dev.yml --env-file ./config/.env.dev down -v --remove-orphans

prod-build-up: setup_env
	docker-compose -f deploy/docker/docker-compose.yml --env-file ./config/.env up --build

prod-build: setup_env
	docker-compose -f deploy/docker/docker-compose.yml --env-file ./config/.env build --no-cache

prod-push: setup_env
	docker-compose -f deploy/docker/docker-compose.yml --env-file ./config/.env push

prod-up-cache: setup_env
	docker-compose -f deploy/docker/docker-compose.yml --env-file ./config/.env up

prod-down: setup_env
	docker-compose -f deploy/docker/docker-compose.yml --env-file ./config/.env down -v --remove-orphans

get-public-cert:
	kubeseal --controller-namespace kube-system --fetch-cert > mycert.pem

prepare-kubeseal:
	kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.26.0/controller.yaml
	kubeseal --fetch-cert > deploy/k8s/kubeseal-cert.pem                                                                                                            󱃾 minikube

setup_kuber_secrets:
	# kubeseal --cert deploy/k8s/kubeseal-cert.pem --from-file=config/.env.global > deploy/k8s/kubeseal-cert.pem                                                                                                            󱃾 minikube
	\
	kubectl create secret generic server-secret \
  --from-env-file=config/apps/.env.server \
  --dry-run=client -o json \
  | kubeseal --cert deploy/k8s/kubeseal-cert.pem -o yaml > deploy/k8s/secrets/server-secret-sealed.yaml
	kubectl create secret generic users-secret \
  --from-env-file=config/apps/users/.env \
  --dry-run=client -o json \
  | kubeseal --cert deploy/k8s/kubeseal-cert.pem -o yaml > deploy/k8s/secrets/users-secret-sealed.yaml
	kubectl create secret generic posts-secret \
  --from-env-file=config/apps/posts/.env \
  --dry-run=client -o json \
  | kubeseal --cert deploy/k8s/kubeseal-cert.pem -o yaml > deploy/k8s/secrets/posts-secret-sealed.yaml
	kubectl create secret generic notifications-secret \
  --from-env-file=config/apps/notifications/.env \
  --dry-run=client -o json \
  | kubeseal --cert deploy/k8s/kubeseal-cert.pem -o yaml > deploy/k8s/secrets/notifications-secret-sealed.yaml
	\
	kubectl apply -f deploy/k8s/secrets

test-build-up: setup_env
	docker-compose -f deploy/docker/docker-compose.test.yml --env-file ./config/.env.test up --build

test-up: setup_env
	docker-compose -f deploy/docker/docker-compose.test.yml --env-file ./config/.env.test up

test-down: setup_env
	docker-compose -f deploy/docker/docker-compose.test.yml --env-file ./config/.env.test down -v --remove-orphans
