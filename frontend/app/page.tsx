import { Home } from "@/features/pages/Home";
import { fetchCollection } from "@/lib/api";
import { getPublicSettings } from "@/lib/settings";

async function getHomeData() {
  const [rooms, gallery, services] = await Promise.all([
    fetchCollection("/rooms"),
    fetchCollection("/gallery"),
    fetchCollection("/services"),
  ]);

  return { rooms, gallery, services };
}

export default async function Page() {
  const [data, settings] = await Promise.all([getHomeData(), getPublicSettings()]);
  return <Home initialData={data} currencyCode={settings.currency} />;
}
