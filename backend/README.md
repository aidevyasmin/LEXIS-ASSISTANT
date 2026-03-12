# Lexis Assistant Backend

## Setup Instructions

1.  **Prerequisites**:
    -   Node.js (v18+)
    -   PostgreSQL (v15+)

2.  **Environment Configuration**:
    -   Copy `.env.example` to `.env` (already done).
    -   Update `DATABASE_URL` in `.env` with your PostgreSQL credentials.
    -   Update `JWT_SECRET` and other keys.

3.  **Database Setup**:
    -   Make sure your PostgreSQL server is running.
    -   Run migrations:
        ```bash
        npx prisma migrate dev --name init
        ```
    -   Generate Prisma Client:
        ```bash
        npx prisma generate
        ```

4.  **Run Server**:
    -   Development:
        ```bash
        npm start
        ```
    -   The server will start on port 5000.

## API Endpoints

-   **Auth**:
    -   `POST /api/auth/register` - Register a new user
    -   `POST /api/auth/login` - Login
    -   `GET /api/auth/me` - Get current user profile

-   **Clients**:
    -   `POST /api/clients/intake` - Create a new client (Public/Lead)
    -   `GET /api/clients` - List all clients (Lawyer only)
    -   `GET /api/clients/:id` - Get client details (Lawyer only)

-   **Appointments**:
    -   `POST /api/appointments` - Book an appointment
    -   `GET /api/appointments` - List all appointments (Lawyer only)
    -   `PUT /api/appointments/:id/status` - Update status (Lawyer only)

-   **AI**:
    -   `POST /api/ai/generate-draft` - Generate a legal draft (Lawyer only)

## Project Structure

-   `src/api`: Controllers and Routes
-   `src/middleware`: Auth and Security middleware
-   `src/models`: Database models (Prisma)
-   `src/services`: Business logic (AI, etc.)
