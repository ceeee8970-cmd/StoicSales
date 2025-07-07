# The Stoic Seller - Sales Training Platform

## Overview

The Stoic Seller is a full-stack web application that combines ancient Stoic philosophy with modern sales training. The platform provides interactive modules, voice practice scenarios, journaling capabilities, and progress tracking to help sales professionals develop both their skills and character.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state, React hooks for local state
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API**: RESTful endpoints for CRUD operations
- **File Handling**: Multer for audio file uploads
- **Validation**: Zod schemas with error handling

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Connection pooling with @neondatabase/serverless

## Key Components

### Learning Management System
- **Modules**: Structured learning content with lessons
- **Progress Tracking**: User completion status and points system
- **Interactive Content**: Text content, assignments, and reflection prompts

### Voice Practice System
- **Audio Recording**: Browser-based audio capture (30-second limit)
- **AI Analysis**: Anthropic Claude integration for feedback generation
- **Scenario Library**: Pre-built sales scenarios for practice
- **Performance Metrics**: Scoring and improvement suggestions

### Journaling System
- **Guided Prompts**: Stoic philosophy-based reflection questions
- **Entry Management**: Create, save, and view journal entries
- **Quote Integration**: Daily wisdom with philosophical quotes

### Resource Library
- **Content Types**: Articles, ebooks, videos, podcasts
- **Search Functionality**: Filter and discover learning materials
- **Community Links**: LinkedIn group integration
- **Premium Content**: SDR team training programs

## Data Flow

### User Learning Journey
1. User selects a module from the dashboard
2. Progress through lessons sequentially
3. Complete assignments and reflections
4. Earn points and advance levels
5. Access practice scenarios and resources

### Voice Practice Flow
1. User selects practice scenario
2. Records audio response (max 30 seconds)
3. Audio uploaded to server
4. AI service analyzes transcript and provides feedback
5. Results stored and displayed to user

### Content Management
1. Modules and lessons stored in PostgreSQL
2. Static assets served via Vite in development
3. User progress tracked with completion timestamps
4. Journal entries linked to user accounts

## External Dependencies

### AI Services
- **Anthropic Claude**: Sales response analysis and feedback generation
- **Fallback System**: Local analysis when API unavailable

### Database Services
- **Neon PostgreSQL**: Serverless database hosting
- **Connection Pooling**: Optimized for serverless environments

### Third-party Libraries
- **Radix UI**: Accessible component primitives
- **Recharts**: Data visualization for progress tracking
- **TanStack Query**: Server state management
- **Zod**: Runtime type validation

### Development Tools
- **Replit Integration**: Development environment optimization
- **TypeScript**: Type safety across the entire stack
- **ESLint/Prettier**: Code quality and formatting

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite dev server with HMR
- **API Proxy**: Express middleware for API routes
- **Database**: Connection to Neon development instance

### Production Build
- **Frontend**: Vite production build with optimization
- **Backend**: ESBuild bundling for Node.js deployment
- **Static Assets**: Intelligent static file serving with multiple path resolution
- **Environment Variables**: Database URL and API keys
- **Cloud Run Support**: Dynamic port binding and proper host configuration

### Database Management
- **Schema Migrations**: Drizzle Kit push command
- **Type Generation**: Automatic TypeScript types from schema
- **Connection Management**: Pooled connections for performance

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 07, 2025. Initial setup
- July 07, 2025. Applied Cloud Run deployment fixes:
  * Server now binds to PORT environment variable for Cloud Run compatibility
  * Added intelligent static file serving that resolves multiple build output paths
  * Improved production static file handling with proper caching headers
  * Enhanced error handling for missing static files