# Club.Fans API

Express.js API with TypeScript, Prisma, and structured architecture.

## Features

- Express.js with TypeScript
- Prisma ORM for database management
- Structured architecture with services, middleware, and routes
- Error handling and logging middleware
- Health check endpoint

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Build

Build the project:
```bash
npm run build
```

### Production

Start the production server:
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Returns server status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Project Structure

```
src/
├── middlewares/         # Custom middleware
├── routes/             # API routes
├── services/           # Business logic
└── server.ts           # Main server file
```