import { Services } from "@/features/pages/Services";
import { fetchCollection } from "@/lib/api";

async function getServices() {
  return fetchCollection("/services");
}

export default async function Page() {
  const services = await getServices();
  return <Services initialServices={services} />;
}
