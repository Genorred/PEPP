# PEPP — Social Platform with Posts, Topics, Recommendations

> Frontend on **Next.js (SSR, SSG, ISR)**, backend implemented as an **Apollo Federation** of NestJS microservices, full‑text search and ranking via **Elasticsearch**, databases are PostgreSQL, Redis, all running in **Docker**.

---

## Video / Demo

https://github.com/user-attachments/assets/0bf6c04b-d1cf-49a7-83b5-bc6eeaba5f66

## Core Idea

A social platform where users can create posts, organize them into **topics** and **subtopics**, comment with upvotes/ratings, follow other users, and receive personalized recommendations. Search is implemented using Elasticsearch (full‑text search with filters). The UI is server‑side rendered (SSR) with Next.js for SEO and fast first‑paint.

---

## Features

* Create / edit / delete posts
* Topics → Subtopics hierarchical taxonomy
* Comments with voting/ratings
* User profiles with activity history and tracking
* Full‑text search across posts and comments (Elasticsearch)
* Recommendation engine (hybrid: content‑based + collaborative signals)
* Authentication & authorization via separate auth microservice in Apollo Federation (NestJS)
* Pagination (cursor and offset) and sorting for lists
* Containerized with Docker & docker‑compose

---

## Architecture (simplified)

```
                    [Next.js (SSR)] (/revalidate)
                          |              ^
                          |              |
                          v              |
                    [Apollo Gateway]-----|
                          |
                          |
                          v
-----------------------------------------------------------------------
{Users Service,      Posts Service,                Notification Service}
      |                     |                              |
      v                     v                              v
[Postgres / Redis]  [Elasticsearch / Postgres / Redis]  [RabbitMQ]
                                                            |
                                                            v
                                                       [Nodemailer]
```

* **Next.js**: renders pages and queries the Gateway. Uses `generateStaticParams` / SSR for SEO pages.
* **Apollo Gateway**: composes GraphQL schemas from microservices.
* **NestJS microservices**: each service owns a part of the schema and business logic (Users, Posts, Notifications).
* **Elasticsearch**: indexes textual content for search and ranking.
* **Postgres**: primary relational store for entities.
* **Redis**: caching, info for recommendations, blacklisted auth session.

---

## Technology Stack

* Frontend: **Next.js** (SSR), TypeScript, React
* GraphQL Gateway: **Apollo Gateway**
* Microservices: **NestJS** + Apollo Server / GraphQL
* Search: **Elasticsearch** (7.x / 8.x)
* Database: **Postgres** (Prisma)
* Cache/Queue: **Redis** (keyv)
* Containerization: **Docker**, **docker‑compose**

---

## Quickstart (local)

**Requirements:** Docker, docker‑compose (or Docker Desktop).
https://docs.docker.com/desktop/setup/install/windows-install/

1. Clone the repository

```bash
git clone https://github.com/Genorred/PEPP.git
cd PEPP
```

2. Copy env templates and add there your external api keys
(google ones) [Check out the guide](https://dev.to/pikkue/create-google-login-credentials-for-your-web-application-3dc2)

Authorized JavaScript origins - http://localhost:7878
Authorized redirect URIs - http://localhost:7878/auth/google/callback

```bash
cp config/env.example config/.env
```

3. Start containers using Make 

```bash
make prod-up
```
  or copy command from there
```bash
docker-compose -f deploy/docker/docker-compose.yml --env-file ./config/.env up --build
```
6. Open app in browser  --- `http://localhost:9898`

---

## Testing

* Unit tests for NestJS and Nextjs: **Jest**.
* E2E tests: run a test compose environment with **Cypress**.

---

## Release checklist

* [ ] Review system

---

## Contribution

PRs are welcome. Please open issues for bugs or feature proposals.

---

## License

MIT

---
