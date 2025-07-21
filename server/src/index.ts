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


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});