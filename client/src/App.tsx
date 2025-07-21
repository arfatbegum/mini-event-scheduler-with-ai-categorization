// client/src/App.tsx
import { useEffect, useState } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import type { Event } from "./types/Event";
import type { NewEvent } from "./types/Event";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<
    "All" | "Work" | "Personal" | "Other"
  >("All");

  // Fetches all events from the backend
  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Failed to load events. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch events on initial component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Handles adding a new event via API
  const handleAddEvent = async (newEvent: NewEvent) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }
      // Re-fetch all events to ensure the list is updated and correctly sorted
      await fetchEvents();
    } catch (err: any) {
      console.error("Failed to add event:", err);
      setError(`Failed to add event: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handles deleting an event via API
  const handleDeleteEvent = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }
      // Optimistically update UI: remove the deleted event from state
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (err: any) {
      console.error("Failed to delete event:", err);
      setError(`Failed to delete event: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handles archiving an event via API (sets archived status to true)
  const handleArchiveEvent = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ archived: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }
      // Update the specific event in the local state
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, archived: true } : event
        )
      );
    } catch (err: any) {
      console.error("Failed to archive event:", err);
      setError(`Failed to archive event: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 w-full mx-auto">
      <div className="w-full">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          Mini Event Scheduler with AI Categorization
        </h1>

        {/* Error Display */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
            <button
              onClick={() => setError(null)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Close alert"
            >
              <svg
                className="fill-current h-6 w-6"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.196l-2.651 2.652a1.2 1.2 0 1 1-1.697-1.697L8.303 9.5l-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697L10 7.803l2.651-2.651a1.2 1.2 0 0 1 1.697 1.697L11.697 9.5l2.651 2.651a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </div>
        )}

        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
          <div className="col-span-1">
            <EventForm onAddEvent={handleAddEvent} isLoading={isLoading} />
          </div>

          <div className="w-full lg:col-span-2 md:col-span-1">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Your Events</h2>
              <div className="mb-4 flex justify-center space-x-2">
                <label htmlFor="category-filter" className="sr-only">
                  Filter by Category
                </label>
                <select
                  id="category-filter"
                  value={filterCategory}
                  onChange={(e) =>
                    setFilterCategory(
                      e.target.value as "All" | "Work" | "Personal" | "Other"
                    )
                  }
                  className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                >
                  <option value="All">All Categories</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {/* Loading indicator for initial fetch */}
            {isLoading && events.length === 0 ? (
              <p className="text-center text-gray-700">Loading events...</p>
            ) : (
              <EventList
                events={events}
                onDeleteEvent={handleDeleteEvent}
                onArchiveEvent={handleArchiveEvent}
                isLoading={isLoading}
                filterCategory={filterCategory}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
