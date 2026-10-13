export function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return { first: name, last: "" };
  return { first: parts.slice(0, -1).join(" "), last: parts.at(-1) ?? "" };
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  return phone;
}

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `tel:+91${digits}` : `tel:${digits}`;
}

export function yearsNumber(label: string) {
  const match = label.match(/\d+/);
  return match ? Number(match[0]) : 0;
}
