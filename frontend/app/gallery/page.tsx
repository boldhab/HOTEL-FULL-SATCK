import { Gallery } from "@/features/pages/Gallery";
import { fetchCollection } from "@/lib/api";

async function getGallery() {
  return fetchCollection("/gallery");
}

export default async function Page() {
  const images = await getGallery();
  return <Gallery initialImages={images} />;
}
