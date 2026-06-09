# Test Project Songs Server

This is a practice project showcasing the use of different technologies, following an architecture that separates concerns across controllers, services and repositories. It uses base classes to make the code reusable and easier to read. It implements a database (PostgreSQL via Prisma), Elasticsearch for efficient searches, RabbitMQ to decouple operation on elastic search, Docker and GitHub actions to show how a CI/CD pipeline works and Jest for unit test

## Tech Stack

- Node.js + Express + TypeScript
- Prisma (PostgreSQL)
- Elasticsearch
- RabbitMQ
- Docker

## Architecture

- Loader pattern — initializes different services like RabbitMQ, Elasticsearch and Express. Loaders allow for a more granular control of what is needed to run the application and the responsibility of each service. Each loader implements a load function defining the logic done in each service
- Repository pattern — Handles operation done on Prisma and Elasticsearch models. Extends base repositories with shared functions like find, save, update and delete but each repository can extends to include custom functionality
- Base CRUD controller — Generic controller that handles CRUD operation across different database models. New models extend base controller in order to allow CRUD operation without duplicating code, but functions can be overwritten to allow for custom logic
- Queue pattern — Async Elasticsearch sync via RabbitMQ, this decouples the operations on elasticsearch from the database. In case the service is down database operations are not affected which are essential for the correct functionality of the server
- CI/CD pipeline builds a Docker image and deploys automatically to a VPS via Coolify webhook, with Cloudflare in front for security

## Project Structure

src/
  config/        — Formats and defines types for env variables
  constants/     — Constant variables like response codes
  controllers/   — Methods called by routes
  routes/        — Available methods on API
  repositories/  — Data access
  services/      — Shared services and business logic
  loaders/       — Infrastructure initialization
  middlewares/   — Global middlewares like error handler
  utils/         — Shared utility functions
  types/         — Shared types

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the values
3. Run `npm install`
4. Run `npx prisma migrate dev`
5. Run `npm run dev`
