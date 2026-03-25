import { Rooms } from "@/features/pages/Rooms";
import { fetchCollection } from "@/lib/api";

// Next.js Server Component Fetch
async function getRooms() {
  return fetchCollection("/rooms");
}

export default async function Page() {
  const rooms = await getRooms();
  return <Rooms initialRooms={rooms} />;
}
