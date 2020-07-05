# Book App

Book app was built on Laravel and React

## Installation

Required versions
PHP 7.2
Composer
PHP-sqlite3
---
Clone the repository

Change directory and initiate database file
```bash
cd book-app/
touch database/database.sqlite
```

Copy .env file and add you absolute database path inside
```bash
cp .env.example .env
```
```bash
DB_DATABASE=<absolute path to database.sqlite>
```

Run composer install, generate app key and migrate database
```bash
composer install
php artisan key:generate
php artisan migrate
```

## Usage

```bash
php artisan serve
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

#Notes

NPM 3.5.2
NodeJS 12

Absolute path example:
```bash
/home/user/book-app/database/database.sqlite
```
