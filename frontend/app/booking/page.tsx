import { getPublicSettings } from "@/lib/settings";

export default async function Page() {
  const settings = await getPublicSettings();

  if (settings.maintenanceMode) {
    return (
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-4xl font-serif text-[#1e3a5f]">Booking Temporarily Unavailable</h1>
        <p className="mt-4 max-w-2xl text-gray-600">
          Online booking is temporarily paused for maintenance. Please contact us directly at{" "}
          <a className="text-[#1e3a5f] underline" href={`mailto:${settings.contactEmail}`}>
            {settings.contactEmail}
          </a>
          {" "}or{" "}
          <a className="text-[#1e3a5f] underline" href={`tel:${settings.contactPhone.replace(/[^\d+]/g, "")}`}>
            {settings.contactPhone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-4xl font-serif text-[#1e3a5f]">Booking</h1>
      <p className="mt-4 max-w-2xl text-gray-600">
        The booking flow is being connected to the live backend. For now, please contact{" "}
        <a className="text-[#1e3a5f] underline" href={`mailto:${settings.contactEmail}`}>
          {settings.contactEmail}
        </a>
        {" "}to request a reservation.
      </p>
      {settings.bookingConfirmationTemplate && (
        <div className="mt-8 max-w-2xl rounded-xl border border-[#c9a961]/30 bg-[#fff8eb] p-6">
          <p className="text-sm font-medium uppercase tracking-wide text-[#8b5a3c]">Booking Notice</p>
          <p className="mt-2 whitespace-pre-wrap text-gray-700">
            {settings.bookingConfirmationTemplate}
          </p>
        </div>
      )}
    </div>
  );
}
