import { IoClose } from "react-icons/io5";
import { BsCircleFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks";

interface ChatHeaderProps {
  isConnected: boolean;
  onClose: () => void;
  isAdmin?: boolean;
  selectedUserName?: string;
}

export const ChatHeader = ({
  isConnected,
  onClose,
  isAdmin = false,
  selectedUserName,
}: ChatHeaderProps) => {
  const { t } = useTranslation();
  const getTitle = () => {
    if (isAdmin) {
      if (selectedUserName) {
        return `${selectedUserName}`;
      }
      return t("chat.customerSupport");
    }
    return t("chat.admin");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
      <div className="flex items-center gap-3">
        <div>
          <h3 className="font-semibold text-gray-dark">{getTitle()}</h3>
          <div className="flex items-center gap-2">
            <BsCircleFill
              className={cn(
                "w-2 h-2 transition-colors",
                isConnected ? "text-green-500" : "text-gray-400"
              )}
            />
            <p className="text-xs text-gray-light">
              {isConnected ? t("chat.active") : t("chat.connecting")}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors -mr-1"
        aria-label={t("chat.closeChat")}
      >
        <IoClose className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};
