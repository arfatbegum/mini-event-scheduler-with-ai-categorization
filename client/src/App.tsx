// client/src/App.tsx
import { useState } from "react";
import EventForm from "./components/EventForm";
import type { NewEvent } from "./types/Event";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err: any) {
      console.error("Failed to add event:", err);
      setError(`Failed to add event: ${err.message}`);
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
        <EventForm onAddEvent={handleAddEvent} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
