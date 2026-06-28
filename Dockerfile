# STAGE 1 - builder (php+node.js+composer)

# FROM ni yg akan run container baru
FROM php:8.3-apache AS builder
#create folder nama app n enter folder tu, all command lepas ni akan berjalan dalam folder ni
WORKDIR /app 

#install system dependencies & Node.js
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

#install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Clone repository terus ke dalam directory kerja (/app)
RUN git clone https://github.com/HazrinShah/EventSystem.git .

# Salin fail .env.example kepada .env jika tiada fail .env di-clone
RUN cp .env.example .env || touch .env

#install pakej PHP (buat folder vendor/, so artisan boleh jalan!)
RUN composer install --no-dev --optimize-autoloader

RUN npm install


RUN php artisan key:generate


#compile vue
#supaya vite create folder public/build

RUN npm run build

# PART VUE SETTLE SINI


#STAGE 2 - setup web server

#dowl php v8.2 along with apache as webserver drpd docker hub
FROM php:8.3-apache
#tukar work dir
#folder rasmi linux where apache akan cari fail untuk display
WORKDIR /var/www/html

#install server requirement - refer laravel doc-deployement
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    default-mysql-client \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

#enable mod rewrite apache supaya routing laravel tk 404
RUN a2enmod rewrite

#bagi nama n location yg dia pegang
#supaya when kita call http://localhost , dia automatik refer ke /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

#edit config apache biar dia tau document root baru kat mana
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
#benda ni kalau tak buat, bila bukak localhost kita akan nampak folder n kene pilih public dulu baru bole bukak

#copy semua file masuk folder apache
COPY --from=builder /app /var/www/html
#chown tu change owner
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Matikan pengesahan sijil SSL untuk MySQL Client
RUN mkdir -p /etc/mysql/conf.d && \
    echo "[client]" > /etc/mysql/conf.d/skip-ssl.cnf && \
    echo "ssl-verify-server-cert=FALSE" >> /etc/mysql/conf.d/skip-ssl.cnf



