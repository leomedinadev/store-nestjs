# Store NestJS

API REST de una tienda construida con **NestJS 11**, **TypeORM** y **PostgreSQL**: productos, marcas, categorías, clientes, usuarios y órdenes, con validación de datos, migraciones y documentación Swagger.

## Stack

- [NestJS 11](https://nestjs.com) y TypeScript
- [TypeORM](https://typeorm.io) con PostgreSQL (migraciones incluidas)
- `class-validator` y `class-transformer` para validar y transformar los DTO
- `@nestjs/config` + Joi para validar las variables de entorno
- Swagger (`@nestjs/swagger`)
- Jest para los tests
- Docker Compose para la base de datos (PostgreSQL + pgAdmin; MySQL + phpMyAdmin opcionales)

## Estructura

```
src/
├── common/            # constantes, entidad base de auditoría y pipes
├── modules/
│   ├── database/      # conexión, data source y migraciones
│   ├── products/      # productos, marcas y categorías
│   └── users/         # usuarios, clientes, órdenes e ítems de orden
├── config.ts          # configuración tipada (registerAs)
└── main.ts            # arranque, ValidationPipe global y Swagger
```

## Cómo ejecutar

Requiere Node.js 20.

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Levantar la base de datos:
   ```bash
   docker compose up -d postgres
   ```

3. Crear el archivo `config/.env` con las variables de la tabla de abajo. Los archivos `.env` no se suben al repositorio.

4. Crear las tablas:
   ```bash
   npm run migrations:run
   ```

5. Arrancar en modo desarrollo:
   ```bash
   npm run start:dev
   ```

La API queda en `http://localhost:3000` y Swagger en `http://localhost:3000/docs`.

Al arrancar, la aplicación consulta `https://jsonplaceholder.typicode.com/todos` (ejemplo de `useFactory` asíncrono), así que necesita conexión a internet.

## Variables de entorno

El archivo se elige con `NODE_ENV`: `config/.env` (por defecto), `config/.stag.env` (`stag`) o `config/.prod.env` (`prod`).

| Variable | Ejemplo | Para qué sirve |
|---|---|---|
| `API_KEY` | `cambia-este-valor` | Clave de ejemplo inyectada como proveedor. Obligatoria. |
| `DATABASE_NAME` | `store_nestjs` | Obligatoria. |
| `DATABASE_PORT` | `5432` | Obligatoria. |
| `POSTGRES_HOST` | `localhost` | Host de PostgreSQL. |
| `POSTGRES_PORT` | `5432` | Puerto de PostgreSQL. |
| `POSTGRES_DB` | `store_nestjs` | Base de datos. |
| `POSTGRES_USER` | `user_store_nestjs` | Usuario. |
| `POSTGRES_PASSWORD` | `admin_store_nestjs` | Contraseña. |
| `PORT` | `3000` | Puerto de la API. |

Los valores de ejemplo de PostgreSQL coinciden con los de `docker-compose.yml` y son solo para desarrollo local.

## Endpoints

| Recurso | Ruta base | Operaciones |
|---|---|---|
| Productos | `/products` | Listar (con filtros y paginación), ver, crear, editar, borrar, y agregar o quitar categorías |
| Marcas | `/brands` | CRUD |
| Categorías | `/categories` | CRUD |
| Clientes | `/customers` | CRUD |
| Usuarios | `/users` | CRUD |
| Órdenes | `/orders` | CRUD |
| Ítems de orden | `/order-details` | Crear, editar y borrar |

El detalle de cada operación está en Swagger.

## Tests

```bash
npm test
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run start:dev` | Arranca con recarga automática |
| `npm run build` | Compila a `dist/` |
| `npm run start:prod` | Arranca la versión compilada |
| `npm test` | Tests unitarios |
| `npm run lint` | ESLint |
| `npm run migrations:generate -- <ruta>` | Genera una migración a partir de las entidades |
| `npm run migrations:run` | Aplica las migraciones pendientes |
| `npm run migrations:show` | Muestra el estado de las migraciones |
| `npm run migrations:revert` | Revierte la última migración |

## Pendiente

- Las contraseñas de los usuarios se guardan en texto plano; falta aplicar un hash (por ejemplo bcrypt) y ampliar la columna. Ya no se devuelven en las respuestas de la API.
- No hay autenticación en los endpoints.

## Apuntes
### Comandos:
- node --version
- npm i -g @nestjs/cli
- nest --version
- nest --help
- nest new your-name-project
  - cd your-name-project
  - npm run start (check => localhost:3000)
- nest g resource [name]
- nest g controller products
- nest g controller categories
- nest g s services/product --flat --no-spec
  - --flat (para que no cree una subcarpeta)
  - --no-spec (para no crear el archivo de test)
- nest g pipe common/parse-int

### Instalacion dependencias
- npm i class-validator class-transformer @nestjs/mapped-types
- npm i pg
- npm i @types/pg
- npm i --save @nestjs/typeorm typeorm
- npm i mysql2

### Migraciones

[//]: # (- typeorm migration:create ./src/modules/database/migrations/PostRefactoring)

[//]: # (- typeorm migration:run -- -d ./src/modules/database/data-source.ts)
- npm run migrations:generate -- ./src/modules/database/migrations/create-tables
- npm run migrations:run
- npm run migrations:show
- npm run migrations:revert
