import { Services } from "@/features/pages/Services";

async function getServices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/services`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export default async function Page() {
  const services = await getServices();
  return <Services initialServices={services} />;
}
