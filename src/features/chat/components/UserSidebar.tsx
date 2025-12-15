import { ChatUser } from "../types/chat";
import { cn } from "@/lib/utils";

interface UserSidebarProps {
  users: ChatUser[];
  selectedUserId?: string;
  onSelectUser: (userId: string) => void;
  unreadCounts: Record<string, number>;
}

export const UserSidebar = ({
  users,
  selectedUserId,
  onSelectUser,
  unreadCounts,
}: UserSidebarProps) => {
  return (
    <div className="w-64 border-r bg-gray-50 flex flex-col">
      <div className="p-4 border-b bg-white">
        <h3 className="font-semibold text-gray-dark">Người dùng</h3>
        <p className="text-xs text-gray-light mt-1">
          {users.length} user{users.length !== 1 ? "s" : ""} đang chat
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {users.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-light text-center px-4">
              Chưa có user nào chat
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {users.map((user) => {
              const unreadCount = unreadCounts[user.userId] || 0;
              const isSelected = selectedUserId === user.userId;

              return (
                <button
                  key={user.userId}
                  onClick={() => onSelectUser(user.userId)}
                  className={cn(
                    "w-full p-3 text-left rounded-lg transition-all duration-200",
                    "flex items-center justify-between group",
                    isSelected
                      ? "bg-green-primary text-white shadow-md"
                      : "hover:bg-white hover:shadow-sm text-gray-dark"
                  )}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full flex-shrink-0",
                        isSelected ? "bg-white" : "bg-green-500"
                      )}
                    />
                    <span className="font-medium truncate">
                      {user.username}
                    </span>
                  </div>

                  {unreadCount > 0 && !isSelected && (
                    <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1 ml-2 flex-shrink-0">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
