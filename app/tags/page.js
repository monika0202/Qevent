"use client";

import { useEffect, useState } from "react";
import Tag from "../../components/Tag";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/tags");
        const data = await res.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-semibold">Loading tags...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tags Page</h1>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
    </div>
  );
}
