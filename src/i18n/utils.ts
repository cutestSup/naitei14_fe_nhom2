import i18n from "./config";
import { USD_TO_VND_RATE } from "@/constants/common";

/**
 * Get locale string for number/date formatting
 * Returns locale string based on current i18n language
 */
export const getLocale = (): string => {
  const lang = i18n.language || "vi";
  return lang === "vi" ? "vi-VN" : "en-US";
};

/**
 * Get currency code based on current language
 */
export const getCurrency = (): string => {
  const lang = i18n.language || "vi";
  return lang === "vi" ? "VND" : "USD";
};

/**
 * Get currency symbol based on current language
 */
export const getCurrencySymbol = (): string => {
  const lang = i18n.language || "vi";
  return lang === "vi" ? "₫" : "$";
};

/**
 * Convert VND to USD using exchange rate
 * Assumes all prices in the system are stored in VND
 */
export const convertVndToUsd = (vndAmount: number): number => {
  return vndAmount / USD_TO_VND_RATE;
};

/**
 * Convert USD to VND using exchange rate
 */
export const convertUsdToVnd = (usdAmount: number): number => {
  return usdAmount * USD_TO_VND_RATE;
};

/**
 * Format number as currency
 * Assumes all prices in the system are stored in VND
 * Automatically converts to USD if language is English
 */
export const formatCurrency = (amount: number): string => {
  const lang = i18n.language || "vi";
  const locale = getLocale();
  const currency = getCurrency();
  
  // If language is English, convert VND to USD
  let displayAmount = amount;
  if (lang === "en") {
    displayAmount = convertVndToUsd(amount);
  }
  
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "VND" ? 0 : 2,
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  }).format(displayAmount);
};

/**
 * Format number with locale
 */
export const formatNumber = (number: number): string => {
  const locale = getLocale();
  return new Intl.NumberFormat(locale).format(number);
};

