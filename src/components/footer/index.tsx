import { Container } from '@/components/ui/Container'
import { RenderNewsletter } from './Newsletter'
import { RenderNavigation } from './Navigation'
import { RenderCopyright } from './Copyright'
import { RenderSocialLinks } from './SocialLinks'
import { useTranslation } from '@/hooks'

export const RenderFooter = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-dark text-white">
      <div className="border-b border-gray-600 py-6">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <span className="text-sm font-semibold md:font-normal">{t("footer.informationChannel")}</span>
              <RenderSocialLinks />
            </div>
            <RenderNewsletter />
          </div>
        </Container>
      </div>

      <div className="py-8">
        <Container>
          <RenderNavigation />
        </Container>
      </div>

      <div className="border-t border-gray-600 py-4">
        <Container>
          <RenderCopyright />
        </Container>
      </div>
    </footer>
  );
};
