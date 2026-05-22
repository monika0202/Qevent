"use client";
export const dynamic = "force-dynamic"; // ✅ prevents prerender errors

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard"; // use absolute import for app router
import { useSearchParams } from "next/navigation";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const artistFilter = searchParams.get("artist");
  const tagFilter = searchParams.get("tag");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/events");
        const data = await res.json();

        let filtered = data;
        if (artistFilter) {
          filtered = filtered.filter((event) => event.artist === artistFilter);
        }
        if (tagFilter) {
          filtered = filtered.filter((event) => event.tags.includes(tagFilter));
        }

        setEvents(filtered);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [artistFilter, tagFilter]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-semibold">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Events Page</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} eventData={event} />
        ))}
      </div>
    </div>
  );
}
