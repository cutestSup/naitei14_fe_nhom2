export { default as i18n } from "./config";
export { useTranslation } from "react-i18next";
export {
  getLocale,
  getCurrency,
  getCurrencySymbol,
  convertVndToUsd,
  convertUsdToVnd,
  formatCurrency,
  formatNumber,
} from "./utils";
export {
  translateProduct,
  translateProductName,
  translateProductDescription,
  loadProductTranslations,
  setProductTranslation,
} from "./utils/productTranslations";

