import { CLASS_HOVER, CLASS_TEXT_SM_GRAY, CLASS_FONT_SEMIBOLD_MB4, CLASS_SPACE_Y2_TEXT_SM } from '@/constants/common'
import { useTranslation } from '@/hooks'

export const RenderNavigation = () => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
      <div>
        <div className="text-xl font-bold text-green-primary mb-4 flex justify-center md:justify-start">
          Green Shop
        </div>
        <p className={CLASS_TEXT_SM_GRAY}>{t("footer.aboutDescription")}</p>
        <p className={CLASS_TEXT_SM_GRAY}>{t("footer.address")}</p>
        <p className={CLASS_TEXT_SM_GRAY}>{t("footer.phone")}</p>
        <p className="text-sm text-gray-400">{t("footer.email")}</p>
      </div>

      <div>
        <div className={CLASS_FONT_SEMIBOLD_MB4}>{t("footer.customerInfo")}</div>
        <ul className={CLASS_SPACE_Y2_TEXT_SM}>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.storeSystem")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.myAccount")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.favoriteProducts")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.returnPolicy")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.delivery")}</a></li>
        </ul>
      </div>

      <div>
        <div className={CLASS_FONT_SEMIBOLD_MB4}>{t("footer.serviceSupport")}</div>
        <ul className={CLASS_SPACE_Y2_TEXT_SM}>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.deliveryPolicy")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.shoppingGuide")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.pointsRewards")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.faq")}</a></li>
        </ul>
      </div>

      <div>
        <div className={CLASS_FONT_SEMIBOLD_MB4}>{t("footer.promotionPolicy")}</div>
        <ul className={`${CLASS_SPACE_Y2_TEXT_SM} mb-6`}>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.returnPolicy")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.warrantyPolicy")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.refundPolicy")}</a></li>
        </ul>
        <div className={CLASS_FONT_SEMIBOLD_MB4}>{t("common.news").toUpperCase()}</div>
        <ul className={CLASS_SPACE_Y2_TEXT_SM}>
          <li><a href="#" className={CLASS_HOVER}>{t("common.news")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.promotions")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.recruitment")}</a></li>
          <li><a href="#" className={CLASS_HOVER}>{t("footer.contact")}</a></li>
        </ul>
      </div>
    </div>
  );
};
