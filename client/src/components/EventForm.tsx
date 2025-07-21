// client/src/components/EventForm.tsx
import React, { useState } from 'react';
import type { NewEvent } from '../types/Event';

interface EventFormProps {
  onAddEvent: (event: NewEvent) => void;
  isLoading: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent, isLoading }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) {
      alert('Title, Date, and Time are required.'); 
      return;
    }
    onAddEvent({ title, date, time, notes });
    // Clear form fields after submission
    setTitle('');
    setDate('');
    setTime('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Event</h2>
      <div className="">
        <div className='mb-4'>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            className="mt-1 block w-full rounded-md bg-gray-100  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            id="time"
            className="mt-1 block w-full bg-gray-100  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="md:col-span-2 mb-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
          <textarea
            id="notes"
            rows={3}
            className="mt-1 block w-full rounded-md bg-gray-100  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add Event'}
      </button>
    </form>
  );
};

export default EventForm;