import { Gallery } from "@/features/pages/Gallery";

async function getGallery() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/gallery`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return [];
  }
}

export default async function Page() {
  const images = await getGallery();
  return <Gallery initialImages={images} />;
}
