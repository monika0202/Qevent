"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateEventPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/events");
    }
  }, [session, router]);

  return <h1 className="text-3xl font-bold">Create Event Page</h1>;
}
