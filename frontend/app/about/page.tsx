import { About } from "@/features/pages/About";
import { getPublicSettings } from "@/lib/settings";

export default async function Page() {
  const settings = await getPublicSettings();
  return <About settings={settings} />;
}
