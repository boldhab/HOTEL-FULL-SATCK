const FALLBACK_CURRENCY = "ETB";

export function formatRoomPrice(amount: number, currencyCode?: string) {
  const resolvedCurrency = currencyCode || FALLBACK_CURRENCY;

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: resolvedCurrency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${resolvedCurrency} ${amount}`;
  }
}
