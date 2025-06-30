import React from "react";

const GoogleCalendarButton = ({ slot }) => {
  if (!slot) return null;

  // Format date en ISO sans millisecondes et en UTC (Google Calendar attend ISO 8601)
  const formatDateTime = (dateStr) => {
    const dt = new Date(dateStr);
    return dt.toISOString().replace(/\.\d{3}Z$/, "Z");
  };

  // Construire l'URL pour ajouter à Google Calendar via lien
  const calendarUrl = new URL("https://calendar.google.com/calendar/render");
  calendarUrl.searchParams.set("action", "TEMPLATE");
  calendarUrl.searchParams.set("text", slot.title);
  calendarUrl.searchParams.set("details", slot.description || "");
  calendarUrl.searchParams.set(
    "dates",
    `${formatDateTime(slot.start_time)}/${formatDateTime(slot.end_time)}`
  );
  calendarUrl.searchParams.set("ctz", "Africa/Dakar"); // Fuseau horaire

  return (
    <a
      href={calendarUrl.toString()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Ajouter à Google Calendar
    </a>
  );
};

export default GoogleCalendarButton;
