import { useTranslation } from "@/hooks";

interface WelcomeMessageProps {
  userName: string;
  userRole?: string;
}

export const WelcomeMessage = ({ userName, userRole }: WelcomeMessageProps) => {
  const { t } = useTranslation();
  const isAdmin = userRole === "admin";

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="text-5xl mb-4">{isAdmin ? "⚡" : "👋"}</div>
      <h2 className="text-xl font-semibold text-gray-dark mb-2">
        {t("chat.hello")}, <span className="text-green-primary">{userName}</span>!
      </h2>
      <p className="text-sm text-gray-light max-w-xs">
        {isAdmin
          ? t("chat.adminWelcomeMessage")
          : t("chat.userWelcomeMessage")}
      </p>
    </div>
  );
};
