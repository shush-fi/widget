import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(precision: number, number: number) {
  if (typeof number === "undefined" || number === null) return "";

  if (number === 0) return "0";

  const roundedValue = round(precision, number);
  const floorValue = Math.floor(roundedValue);

  const isInteger = Math.abs(floorValue - roundedValue) < Number.EPSILON;

  const numberOfFloorDigits = String(floorValue).length;
  const numberOfDigits = String(roundedValue).length;

  if (numberOfFloorDigits > precision) {
    return String(floorValue);
  } else {
    const padding = isInteger
      ? precision - numberOfFloorDigits
      : precision - numberOfDigits + 1;

    if (padding > 0) {
      if (isInteger) {
        return `${String(floorValue)}.${"0".repeat(padding)}`;
      } else {
        return `${String(roundedValue)}${"0".repeat(padding)}`;
      }
    } else {
      return String(roundedValue);
    }
  }
}

function round(precision: number, number: number) {
  return parseFloat(number.toPrecision(precision));
}

export function formatAmount(amount: number) {
  return formatNumber(5, amount);
}

export function shortenAddress(address: string | undefined) {
  if (!address) return "";
  
  if (address.length < 10) return address;

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function shortenOrderId(orderId: string) {
  return orderId.slice(0, 3) + "..." + orderId.slice(-3);
}

