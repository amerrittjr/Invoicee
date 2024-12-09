import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./uniDash.css";

const CalendarDash = () => {
  const [events, setEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // For event details
  const [showMore, setShowMore] = useState(false);

  const client = new Client();
  const database = new Databases(client);

  const projectId = process.env.REACT_APP_APPWRITE_PROJECT_ID;
  const collectionId = process.env.REACT_APP_APPWRITE_CALENDAR_COLLECTION_ID;
  const databaseId = process.env.REACT_APP_APPWRITE_INVOICE_DATABASE_ID;

  useEffect(() => {
    client
      .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
      .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await database.listDocuments(databaseId, collectionId);
      setEvents(response.documents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleEventCompletion = (eventId) => {
    setCompletedEvents([...completedEvents, eventId]);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const handleDragEnd = (event, newDate) => {
    const updatedEvents = events.map((e) =>
      e.$id === event.$id ? { ...e, date: newDate } : e
    );
    setEvents(updatedEvents);
  };

  const renderEventDetails = () => {
    if (!selectedEvent) return null;

    return (
      <div className="event-details">
        <h3>Event Details</h3>
        <p>
          <strong>Title:</strong> {selectedEvent.title}
        </p>
        <p>
          <strong>Date:</strong> {new Date(selectedEvent.date).toDateString()}
        </p>
        <p>
          <strong>Time:</strong> {selectedEvent.startTime} -{" "}
          {selectedEvent.endTime}
        </p>
        <p>
          <strong>Location:</strong> {selectedEvent.location}
        </p>
        <p>
          <strong>Description:</strong> {selectedEvent.description}
        </p>
        <button onClick={closeEventDetails}>Close</button>
      </div>
    );
  };

  return (
    <div className="calendar-container large-calendar">
      <h2>My Calendar</h2>
      <Calendar
        tileContent={({ date, view }) => {
          const dayEvents = events.filter(
            (event) =>
              new Date(event.date).toDateString() === date.toDateString()
          );
          return (
            <div className="tile-content">
              {dayEvents.map((event) => (
                <div
                  key={event.$id}
                  className={`event ${
                    completedEvents.includes(event.$id) ? "completed" : ""
                  }`}
                  draggable
                  onDragEnd={(e) => handleDragEnd(event, date)}
                  onClick={() => handleEventClick(event)}
                >
                  <span>{event.title}</span>
                </div>
              ))}
            </div>
          );
        }}
        view="week"
        showNeighboringMonth={false}
      />
      <button onClick={() => setShowMore(!showMore)} className="toggle-btn">
        {showMore ? "Switch to Week View" : "Switch to Month View"}
      </button>
      {renderEventDetails()}
      <div className="stats">
        <p>Total Events Scheduled: {events.length}</p>
        <p>Completed Events: {completedEvents.length}</p>
      </div>
    </div>
  );
};

export default CalendarDash;
