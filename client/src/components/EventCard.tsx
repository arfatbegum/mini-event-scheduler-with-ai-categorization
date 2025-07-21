// client/src/components/EventCard.tsx
import React from "react";
import type { Event } from "../types/Event";

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  isLoading: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onDelete,
  onArchive,
  isLoading,
}) => {
  const categoryColor = {
    Work: "bg-blue-100 text-blue-800",
    Personal: "bg-green-100 text-green-800",
    Other: "bg-violet-100 text-violet-800",
  };

  return (
    <div
      className={`relative p-4 border rounded-lg shadow-sm ${
        event.archived ? "bg-gray-50 opacity-70" : "bg-white"
      } pb-16`}
    >
      <h3
        className={`text-lg font-semibold mb-2 capitalize ${
          event.archived ? "line-through text-gray-500" : "text-gray-900"
        }`}
      >
        {event.title}
      </h3>

      <div className="text-sm text-gray-600 mb-2">
        <span
          className={`mb-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            categoryColor[event.category]
          }`}
        >
          {event.category}
        </span>
        <p className="text-sm text-gray-700 flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gray-600 mr-1"
          >
            <path
              d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.103 0-2 .897-2 2v14c0 
             1.103.897 2 2 2h14c1.103 0 2-.897 
             2-2V6c0-1.103-.897-2-2-2zm0 
             16H5V10h14v10zm0-12H5V6h14v2z"
            />
          </svg>
          {event.date}
        </p>

        <p className="text-sm text-gray-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 text-gray-600 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {event.time}
        </p>
      </div>

      {event.notes && (
        <p className="text-gray-700 text-sm mb-2">
          <strong>Notes:</strong> {event.notes}
        </p>
      )}

      <div className="absolute bottom-4 right-4 flex space-x-2">
        {!event.archived && (
          <button
            onClick={() => onArchive(event.id)}
            className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            Archive
          </button>
        )}
        <button
          onClick={() => onDelete(event.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
