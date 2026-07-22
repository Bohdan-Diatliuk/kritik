# Kritik — чесні відгуки на реальні продукти

Kritik — каталог продуктів (м'ясо, риба, овочі, випічка, напої тощо), де кожен
може відкрити картку товару, залишити оцінку (1-5 зірок) і текстовий відгук
під власним ім'ям або анонімно, а також додати товар, якого немає в каталозі.

## Стек

### Frontend (`frontend/`)

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS v4
- react-paginate, lucide-react

### Backend (`backend/`)

- NestJS + TypeScript
- Prisma ORM
- PostgreSQL
- class-validator / class-transformer
- Multer (завантаження фото товарів)

### Інфраструктура

- Docker / Docker Compose (dev та prod конфігурації)

## Структура проєкту

```
backend/    NestJS API: продукти, категорії, відгуки, завантаження фото
frontend/   React SPA: каталог, сторінка продукту, форма відгуку
```

## Локальний запуск через Docker (рекомендовано)

Потрібен лише встановлений Docker.

```bash
make dev      # підняти postgres + backend + frontend з білдом
# або
make up       # підняти без білду (якщо образи вже зібрані)
```

Після запуску:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Prisma Studio: `make studio` → http://localhost:5555

Інші корисні команди (`make help`-подібний список дивись у `Makefile`):

```bash
make migrate       # застосувати Prisma-міграції в контейнері backend
make down          # зупинити контейнери
make logs          # логи всіх сервісів
make db-shell      # psql-консоль до бази
make backend-shell # shell всередині контейнера backend
```

Насіяти базу тестовими даними (категорії + продукти):

```bash
docker compose exec backend npx prisma db seed
```

## Локальний запуск без Docker

Потрібні Node.js 20+ та запущений PostgreSQL.

### Backend

```bash
cd backend
npm install
# створи файл .env (див. приклад нижче)
npx prisma migrate dev
npx prisma db seed
npm run start:dev       # http://localhost:3000
```

`.env` мінімально повинен містити:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kritik_dev?schema=public"
```

### Frontend

```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```

Фронтенд читає адресу бекенду зі змінної середовища `VITE_API_URL`
(за замовчуванням `http://localhost:3000`).

## Продакшн

```bash
make prod     # docker compose -f docker-compose.prod.yml up --build
```
