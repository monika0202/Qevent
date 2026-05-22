"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(
          `https://qevent-backend.labs.crio.do/events/${eventId}`
        );
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-semibold">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-semibold">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-64 object-cover rounded-md shadow-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-600 mb-2">
        {new Date(event.date).toDateString()} | {event.time}
      </p>
      <p className="text-gray-600 mb-4">{event.location}</p>
      <div className="flex gap-2 mb-4">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl px-3 py-1 text-sm font-bold"
          >
            #{tag}
          </span>
        ))}
      </div>
      <p className="mb-6">{event.description}</p>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">{event.artist}</h3>
        <h3 className="text-2xl font-semibold">
          {event.price > 0 ? `$ ${event.price.toLocaleString()}` : "FREE"}
        </h3>
      </div>
    </div>
  );
}
