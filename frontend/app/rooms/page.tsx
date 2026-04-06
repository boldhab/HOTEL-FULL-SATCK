import { Rooms } from "@/features/pages/Rooms";
import { fetchCollection } from "@/lib/api";
import { getPublicSettings } from "@/lib/settings";

// Next.js Server Component Fetch
async function getRooms() {
  return fetchCollection("/rooms");
}

export default async function Page() {
  const [rooms, settings] = await Promise.all([getRooms(), getPublicSettings()]);
  return <Rooms initialRooms={rooms} currencyCode={settings.currency} />;
}
