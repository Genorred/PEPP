.PHONY: up

build: merge-env
	docker compose down
	docker compose up -d db
	docker compose build
	docker-compose up

up: merge-env
	docker-compose up



merge-env:
	cat client/.env server/.env > .env



dev:
	docker compose up -d db
	cd client & pnpm run dev
	cd server & pnpm run start:dev --prefix /server
