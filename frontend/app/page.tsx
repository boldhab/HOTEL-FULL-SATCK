import { Home } from "@/features/pages/Home";

async function getHomeData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    
    // Concurrent requests for maximum performance
    const [roomsRes, galleryRes, servicesRes] = await Promise.all([
      fetch(`${baseUrl}/rooms`, { cache: 'no-store' }),
      fetch(`${baseUrl}/gallery`, { cache: 'no-store' }),
      fetch(`${baseUrl}/services`, { cache: 'no-store' })
    ]);
    
    // Parse JSON
    const [rooms, gallery, services] = await Promise.all([
      roomsRes.ok ? roomsRes.json().then(res => res.data || []) : Promise.resolve([]),
      galleryRes.ok ? galleryRes.json().then(res => res.data || []) : Promise.resolve([]),
      servicesRes.ok ? servicesRes.json().then(res => res.data || []) : Promise.resolve([])
    ]);
    
    return { rooms, gallery, services };
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    return { rooms: [], gallery: [], services: [] };
  }
}

export default async function Page() {
  const data = await getHomeData();
  return <Home initialData={data} />;
}
