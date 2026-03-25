import { Home } from "@/features/pages/Home";
import { fetchCollection } from "@/lib/api";

async function getHomeData() {
  const [rooms, gallery, services] = await Promise.all([
    fetchCollection("/rooms"),
    fetchCollection("/gallery"),
    fetchCollection("/services"),
  ]);

  return { rooms, gallery, services };
}

export default async function Page() {
  const data = await getHomeData();
  return <Home initialData={data} />;
}
