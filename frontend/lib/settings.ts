import { fetchCollection } from "@/lib/api";

export type PublicSettings = {
  hotelName: string;
  contactEmail: string;
  hotelAddress: string;
  contactPhone: string;
  website: string;
  timezone: string;
  currency: string;
  checkInTime: string;
  checkOutTime: string;
  bookingConfirmationTemplate: string;
  enableNotifications: boolean;
  maintenanceMode: boolean;
};

const defaultSettings: PublicSettings = {
  hotelName: "Ethio Bernos Hotel",
  contactEmail: "ethiobernoshotel@gmail.com",
  hotelAddress: "Debre Berhan, Ethiopia",
  contactPhone: "+251-930-362151",
  website: "",
  timezone: "UTC",
  currency: "ETB",
  checkInTime: "14:00",
  checkOutTime: "11:00",
  bookingConfirmationTemplate: "",
  enableNotifications: true,
  maintenanceMode: false,
};

type SettingRecord = {
  key: string;
  value: unknown;
};

const asString = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;

const asBoolean = (value: unknown, fallback = false) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value === "true") return true;
    if (value === "false") return false;
  }
  return fallback;
};

export async function getPublicSettings(): Promise<PublicSettings> {
  const settings = await fetchCollection<SettingRecord>("/settings");
  const mapped = { ...defaultSettings };

  settings.forEach((item) => {
    switch (item.key) {
      case "hotel_name":
        mapped.hotelName = asString(item.value, mapped.hotelName);
        break;
      case "contact_email":
        mapped.contactEmail = asString(item.value, mapped.contactEmail);
        break;
      case "hotel_address":
        mapped.hotelAddress = asString(item.value, mapped.hotelAddress);
        break;
      case "contact_phone":
        mapped.contactPhone = asString(item.value, mapped.contactPhone);
        break;
      case "website":
        mapped.website = asString(item.value, mapped.website);
        break;
      case "timezone":
        mapped.timezone = asString(item.value, mapped.timezone);
        break;
      case "currency":
        mapped.currency = asString(item.value, mapped.currency);
        break;
      case "check_in_time":
        mapped.checkInTime = asString(item.value, mapped.checkInTime);
        break;
      case "check_out_time":
        mapped.checkOutTime = asString(item.value, mapped.checkOutTime);
        break;
      case "booking_confirmation_template":
        mapped.bookingConfirmationTemplate = asString(item.value, mapped.bookingConfirmationTemplate);
        break;
      case "enable_notifications":
        mapped.enableNotifications = asBoolean(item.value, mapped.enableNotifications);
        break;
      case "maintenance_mode":
        mapped.maintenanceMode = asBoolean(item.value, mapped.maintenanceMode);
        break;
      default:
        break;
    }
  });

  return mapped;
}
