# Student Management System

## Overview

This is a full-stack web application for managing student records, course enrollment, assignments, and academic progress. Built with React on the frontend and Express.js on the backend, the system provides a comprehensive dashboard for educational institutions to track student performance and administrative data.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Component Library**: Radix UI components with shadcn/ui design system
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with typed endpoints
- **Development**: Hot reloading with Vite middleware in development mode

## Key Components

### Database Layer
- **ORM**: Drizzle ORM for type-safe database queries
- **Schema**: Four main tables (students, courses, assignments, progress)
- **Migrations**: Database schema management through Drizzle migrations
- **Connection**: Neon serverless database connection

### API Layer
- **Routes**: RESTful endpoints for CRUD operations
- **Validation**: Zod schema validation for request/response data
- **Error Handling**: Centralized error handling middleware
- **Logging**: Request/response logging for API monitoring

### Frontend Components
- **Dashboard**: Overview with statistics, charts, and quick actions
- **Student Management**: List, search, add, edit, and delete students
- **Registration**: Student enrollment form with validation
- **Progress Tracking**: Assignment and grade management
- **Statistics**: Data visualization with charts and analytics

### UI Components
- **Design System**: Comprehensive UI component library based on Radix UI
- **Responsive Design**: Mobile-first responsive layout
- **Accessibility**: ARIA-compliant components with keyboard navigation
- **Theming**: CSS variables for consistent theming across components

## Data Flow

1. **Client Request**: Frontend components make API calls using TanStack Query
2. **API Processing**: Express routes handle requests with validation
3. **Database Operations**: Drizzle ORM executes type-safe database queries
4. **Response**: JSON data returned to frontend with proper error handling
5. **UI Updates**: React components re-render with fresh data

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` and `drizzle-zod` for database operations
- **Validation**: `zod` for schema validation
- **State Management**: `@tanstack/react-query` for server state
- **UI Components**: Radix UI component primitives
- **Charts**: `recharts` for data visualization
- **Forms**: `react-hook-form` and `@hookform/resolvers`

### Development Dependencies
- **Build Tools**: Vite with React plugin
- **TypeScript**: Full TypeScript support across the stack
- **Styling**: Tailwind CSS with PostCSS processing
- **Development**: Hot reloading and error overlay

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied to PostgreSQL database

### Production Setup
- **Environment Variables**: `DATABASE_URL` for database connection
- **Server**: Node.js server serving both API and static assets
- **Database**: Neon serverless PostgreSQL database
- **Static Assets**: Frontend assets served from Express server

### Development Workflow
- **Hot Reloading**: Vite development server with HMR
- **API Proxy**: Development server proxies API requests to Express
- **Database**: Drizzle CLI for schema management and migrations
- **Type Safety**: Shared TypeScript types between frontend and backend

## Changelog

- July 08, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.