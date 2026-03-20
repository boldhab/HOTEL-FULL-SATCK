import { Rooms } from "@/features/pages/Rooms";

// Next.js Server Component Fetch
async function getRooms() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/rooms`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return [];
  }
}

export default async function Page() {
  const rooms = await getRooms();
  return <Rooms initialRooms={rooms} />;
}
