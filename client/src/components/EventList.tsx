// client/src/components/EventList.tsx
import React from 'react';
import type { Event } from '../types/Event';
import EventCard from './EventCard';

interface EventListProps {
  events: Event[];
  onDeleteEvent: (id: string) => void;
  onArchiveEvent: (id: string) => void;
  isLoading: boolean;
  filterCategory: 'All' | 'Work' | 'Personal' | 'Other';
}

const EventList: React.FC<EventListProps> = ({ events, onDeleteEvent, onArchiveEvent, isLoading, filterCategory }) => {
  const filteredEvents = events.filter(event =>
    filterCategory === 'All' || event.category === filterCategory
  );

  return (
    <div className="">
      {filteredEvents.length === 0 ? (
        <p className="text-gray-600">No events to display. Add some events!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={onDeleteEvent}
              onArchive={onArchiveEvent}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;