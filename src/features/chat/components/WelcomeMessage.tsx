interface WelcomeMessageProps {
  userName: string;
  userRole?: string;
}

export const WelcomeMessage = ({ userName, userRole }: WelcomeMessageProps) => {
  const isAdmin = userRole === "admin";

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="text-5xl mb-4">{isAdmin ? "⚡" : "👋"}</div>
      <h2 className="text-xl font-semibold text-gray-dark mb-2">
        Xin chào, <span className="text-green-primary">{userName}</span>!
      </h2>
      <p className="text-sm text-gray-light max-w-xs">
        {isAdmin
          ? "Chọn một người dùng từ danh sách bên trái để bắt đầu trò chuyện và hỗ trợ."
          : "Chúng tôi có thể giúp gì cho bạn hôm nay? Hãy gửi tin nhắn và chúng tôi sẽ phản hồi ngay."}
      </p>
    </div>
  );
};
