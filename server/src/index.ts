// server/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { Event, CreateEventPayload } from './types';
import { categorizeEvent } from './utils/categorizer';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// In-memory data store
let events: Event[] = [];

// Helper function for sorting events by date and time
const sortEvents = (eventsArray: Event[]): Event[] => {
    return [...eventsArray].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
    });
};

// --- API Endpoints ---

// POST /events: Create a new event
app.post('/events', (req: Request<{}, {}, CreateEventPayload>, res: Response) => {
    const { title, date, time, notes } = req.body;

    // Basic Input Validation
    if (!title || !date || !time) {
        return res.status(400).json({ message: 'Title, date, and time are required.' });
    }
    if (typeof title !== 'string' || typeof date !== 'string' || typeof time !== 'string') {
         return res.status(400).json({ message: 'Invalid input types for title, date, or time.' });
    }
    // Simple date/time format validation (can be more robust with regex/libraries)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
         return res.status(400).json({ message: 'Date must be YYYY-MM-DD and Time must be HH:MM.' });
    }


    const newEvent: Event = {
        id: uuidv4(),
        title,
        date,
        time,
        notes,
        category: categorizeEvent(title, notes),
        archived: false, 
    };

    events.push(newEvent);
    res.status(201).json(newEvent);
});

// GET /events: Retrieve all events, sorted
app.get('/events', (req: Request, res: Response) => {
    res.status(200).json(sortEvents(events));
});

// PUT /events/:id: Update an event's archived status to true
app.put('/events/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex === -1) {
        return res.status(404).json({ message: 'Event not found.' });
    }
    // Update the event's archived status
    events[eventIndex] = { ...events[eventIndex], archived: true };

    res.status(200).json(events[eventIndex]);
});

// DELETE /events/:id: Delete an event
app.delete('/events/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const initialLength = events.length;
    events = events.filter(event => event.id !== id);

    if (events.length === initialLength) {
        return res.status(404).json({ message: 'Event not found.' });
    }

    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});