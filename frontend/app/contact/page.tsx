import { getPublicSettings } from "@/lib/settings";
import { Contact } from "@/features/pages/Contact";

export default async function Page() {
  const settings = await getPublicSettings();

  return <Contact settings={settings} />;
}
