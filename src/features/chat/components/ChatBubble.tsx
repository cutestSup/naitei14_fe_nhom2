import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  onClick: () => void;
  unreadCount: number;
}

export const ChatBubble = ({ onClick, unreadCount }: ChatBubbleProps) => {
  return (
    <button
      onClick={onClick}
      className="relative bg-green-primary hover:bg-green-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Mở chat"
    >
      <IoChatbubbleEllipsesSharp className="w-6 h-6" />

      {unreadCount > 0 && (
        <span
          className={cn(
            "absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold",
            "rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5",
            "shadow-md animate-pulse"
          )}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
};
