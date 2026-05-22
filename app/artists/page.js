"use client";

import { useEffect, useState } from "react";
import ArtistCard from "../../components/ArtistCard";
import { useRouter } from "next/navigation";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchArtists() {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/artists");
        const data = await res.json();
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-semibold">Loading artists...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Artists Page</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artistData={artist}
            onViewEvents={() =>
              router.push(`/events?artist=${encodeURIComponent(artist.name)}`)
            }
          />
        ))}
      </div>
    </div>
  );
}
