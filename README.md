# Mini Event Scheduler with AI Categorization

This is a full-stack application that allows users to create, view, update, and delete events. It features a React frontend with Tailwind CSS and a Node.js/TypeScript backend. A key feature is the **automatic categorization** of events (as "Work," "Personal," or "Other") based on keywords found in the event title or notes, demonstrating a simple AI-like logic.

## Features

* **Frontend (React, TypeScript, Tailwind CSS):**
    * Create new events with title, date, time, and optional notes.
    * View a list of all events, sorted by date and time.
    * Auto-populated event category displayed.
    * Ability to archive or delete events.
    * Responsive UI for desktop and mobile.
    * Basic error handling for API calls.
    * Filter events by category (Bonus).
* **Backend (Node.js, Express, TypeScript):**
    * RESTful API for CRUD operations on events.
    * In-memory storage for simplicity (no database required).
    * Automatic event categorization based on keywords ("Work," "Personal," "Other").
    * Basic input validation for event creation.

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js)
* Git

### Setup and Run Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/arfatbegum/mini-event-scheduler-with-ai-categorization.git
    cd mini-event-scheduler
    ```

2.  **Backend Setup:**

    Navigate to the `server` directory, install dependencies, and start the backend server.

    ```bash
    cd server
    npm install
    npm run dev
    ```
    The backend server should start on `http://localhost:5000`. Keep this terminal running.

3.  **Frontend Setup:**

    Open a **new terminal window**, navigate to the `client` directory, install dependencies, and start the frontend development server.

    ```bash
    cd ../client # If you're still in the server directory
    npm install
    npm run dev
    ```
    The frontend application should open in your browser (usually `http://localhost:5173`).

You can now interact with the Mini Event Scheduler!

### API Endpoints (Backend: `https://mini-event-scheduler-with-ai.onrender.com`)

| Method | Endpoint      | Description                                | Request Body (JSON)                                    | Response                                       |
| :----- | :------------ | :----------------------------------------- | :----------------------------------------------------- | :--------------------------------------------- |
| `POST` | `/events`     | Creates a new event.                       | `{ "title": "...", "date": "YYYY-MM-DD", "time": "HH:MM", "notes?": "..." }` | `201 Created` + new event object <br> `400 Bad Request` |
| `GET`  | `/events`     | Retrieves all events, sorted by date/time. | None                                                   | `200 OK` + array of event objects              |
| `PUT`  | `/events/:id` | Archives an event (sets `archived` to `true`). | `{ "archived": true }` (only `archived: true` is processed) | `200 OK` + updated event object <br> `404 Not Found` |
| `DELETE` | `/events/:id` | Deletes an event.                          | None                                                   | `204 No Content` <br> `404 Not Found`         |

## AI Categorization Logic

The backend automatically categorizes events into "Work," "Personal," or "Other" based on keywords present in the event's title or notes.

* **Work Keywords:** `meeting`, `project`, `client`, `deadline`, `report`, `presentation`, `sprint`, `scrum`, `business`
* **Personal Keywords:** `birthday`, `family`, `friends`, `anniversary`, `party`, `vacation`, `holiday`, `dinner`, `lunch`
* Any event not matching these keywords will be categorized as "Other."

## Bonus Features Implemented

* **Frontend Error Handling:** Displays user-friendly error messages if API calls fail.
* **Frontend Category Filter:** Allows users to filter events by "Work," "Personal," or "Other" categories.
* **Environment Variables (Frontend):** Uses `VITE_API_BASE_URL` to configure the backend API endpoint.
