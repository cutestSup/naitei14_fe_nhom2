import { CLASS_HOVER } from '@/constants/common'
import { useTranslation } from '@/hooks'

export const RenderCopyright = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 text-center md:text-left">
      <div className="flex flex-wrap gap-4">
        <a href="#" className={CLASS_HOVER}>{t("footer.sitemap")}</a>
        <a href="#" className={CLASS_HOVER}>{t("footer.productCatalog")}</a>
        <a href="#" className={CLASS_HOVER}>{t("footer.qa")}</a>
        <a href="#" className={CLASS_HOVER}>{t("footer.contactInfo")}</a>
        <a href="#" className={CLASS_HOVER}>{t("footer.commonConfig")}</a>
      </div>
      <div>{t("footer.designedBy")}</div>
    </div>
  );
};
