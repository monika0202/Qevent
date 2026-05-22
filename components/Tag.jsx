"use client";
import { useRouter } from "next/navigation";

const Tag = ({ text }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/events?tag=${encodeURIComponent(text)}`)}
      className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl w-fit px-3 py-1 font-bold hover:scale-110 transition"
    >
      # {text}
    </button>
  );
};

export default Tag;
