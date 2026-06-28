#!/bin/bash

# Padam sebarang storage link sedia ada (termasuk yang rosak dari Windows)
rm -rf public/storage

# Jana storage link baharu untuk Linux/Docker
echo "Generating storage symlink..."
php artisan storage:link --force || true

# Tunggu sehingga database (MySQL) bersedia
echo "Waiting for database connection..."
until mysqladmin ping -h"$DB_HOST" -u"$DB_USERNAME" -p"$DB_PASSWORD" --silent; do
    echo "Database is still booting up - waiting 2 seconds..."
    sleep 2
done

# Jalankan database migrations secara automatik
echo "Database is ready! Running migrations..."
php artisan migrate --force

# Jalankan database seeders secara automatik
echo "Running seeders..."
php artisan db:seed --force

# Jalankan Apache dalam foreground (untuk kekalkan container bernyawa)
echo "Starting Apache Web Server..."
exec apache2-foreground
