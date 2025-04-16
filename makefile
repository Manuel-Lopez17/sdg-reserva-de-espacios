# Makefile

BACKEND_DIR=./backend
FRONTEND_DIR=./frontend

### === BACKEND COMPOSER === ###

composer-install:
	docker run --rm -v $(PWD)/$(BACKEND_DIR):/app -w /app composer install

composer-update:
	docker run --rm -v $(PWD)/$(BACKEND_DIR):/app -w /app composer update

laravel-new:
	docker run --rm -v $(PWD)/$(BACKEND_DIR):/app -w /app composer create-project laravel/laravel .

### === FRONTEND PNPM === ###

frontend-install:
	docker run --rm -v $(PWD)/$(FRONTEND_DIR):/app -w /app node:18-alpine sh -c "corepack enable && corepack prepare pnpm@latest --activate && pnpm install"

frontend-build:
	docker run --rm -v $(PWD)/$(FRONTEND_DIR):/app -w /app node:18-alpine sh -c "corepack enable && corepack prepare pnpm@latest --activate && pnpm run build"

### === DOCKER === ###

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

### === LARAVEL ARTISAN === ###

artisan:
	docker-compose exec backend php artisan

migrate:
	docker-compose exec backend php artisan migrate

test:
	docker-compose exec backend php artisan test
