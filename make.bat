@echo off
setlocal

REM === Entrar al backend y correr composer install ===
if "%1" == "composer-install" (
    docker run --rm -v %cd%\backend:/app -w /app composer install
    exit /b
)

REM === Crear proyecto Laravel ===
if "%1" == "laravel-new" (
    docker run --rm -v %cd%\backend:/app -w /app composer create-project laravel/laravel .
    exit /b
)

REM === Instalar frontend con pnpm ===
if "%1" == "frontend-install" (
    docker run --rm -v %cd%\frontend:/app -w /app node:18-alpine sh -c "corepack enable && corepack prepare pnpm@latest --activate && pnpm install"
    exit /b
)

REM === Build del frontend ===
if "%1" == "frontend-build" (
    docker run --rm -v %cd%\frontend:/app -w /app node:18-alpine sh -c "corepack enable && corepack prepare pnpm@latest --activate && pnpm run build"
    exit /b
)

REM === Docker ===
if "%1" == "build" (
    docker-compose build
    exit /b
)

if "%1" == "up" (
    docker-compose up -d
    exit /b
)

if "%1" == "down" (
    docker-compose down
    exit /b
)

if "%1" == "logs" (
    docker-compose logs -f
    exit /b
)

REM === Artisan ===
if "%1" == "artisan" (
    docker-compose exec backend php artisan
    exit /b
)

if "%1" == "migrate" (
    docker-compose exec backend php artisan migrate
    exit /b
)

if "%1" == "test" (
    docker-compose exec backend php artisan test
    exit /b
)

echo Comando no reconocido: %1
exit /b 1
