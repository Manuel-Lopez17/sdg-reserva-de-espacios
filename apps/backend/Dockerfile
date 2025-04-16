# Etapa 1: PHP + Composer
FROM php:8.2-fpm as base

# Instalamos las dependencias necesarias para Laravel y SQLite
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*

# Instalamos Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Establecemos el directorio de trabajo
WORKDIR /var/www

# Copiamos composer.* primero para aprovechar la cache
COPY composer.json composer.lock ./

# Instalamos las dependencias de Composer sin ejecutar scripts aún
RUN composer install --no-autoloader --no-scripts

# Copiamos el resto del código del proyecto
COPY . .

# Generamos autoload optimizado
RUN composer dump-autoload --optimize

# Copiamos .env.example si .env no existe
RUN [ ! -f .env ] && cp .env.example .env || true

# Generamos la clave de la app
RUN php artisan key:generate

# Ejecutamos migraciones + seeders
RUN php artisan migrate:fresh --seed --force

# Exponemos el puerto para php-fpm
EXPOSE 9000

# Comando por defecto
CMD ["php-fpm"]
