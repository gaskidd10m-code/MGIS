# Gossip Gazette

A modern news website built with React, Express.js, and Neon PostgreSQL.

## Architecture

- **Frontend**: React/Vite app
- **Backend**: Express.js server
- **Database**: Neon PostgreSQL

## Prerequisites

Before running the application, ensure you have:

1. **Node.js** installed (v16 or higher recommended)
2. **Neon Database** connection string
3. All dependencies installed

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create or update your `.env` file with your Neon database connection string:

```env
DATABASE_URL=your_neon_connection_string
```

### 3. Database Schema

Ensure your Neon database has the required tables:
- `articles`
- `categories`
- `comments`
- `settings`

## Running the Application

### Run Backend Server

To start the Express.js backend server:

```bash
npm run server
```

This will:
- Start the server on **port 3001** (`http://localhost:3001`)
- Watch for file changes and auto-restart
- Connect to your Neon PostgreSQL database

### Run Frontend

To start the React frontend:

```bash
npm run dev
```

This will start the Vite development server (typically on `http://localhost:5173`)

### Run Both (Recommended)

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run server` - Start the backend API server with auto-reload
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build

## API Endpoints

The backend server provides the following API endpoints:

- **Articles**: `/api/articles`
- **Categories**: `/api/categories`
- **Comments**: `/api/comments`
- **Settings**: `/api/settings/:key`

## Troubleshooting

- Make sure your `DATABASE_URL` is correctly set in `.env`
- Ensure both frontend and backend are running simultaneously
- Check that port 3001 is available for the backend server
