import { type ReactNode } from "react";
import { RenderHeader } from "@/components/header";
import { RenderFooter } from "@/components/footer";
import { useAuth } from "@/contexts";
import { ChatWidget } from "@/features/chat/components";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <RenderHeader />
      <main className="flex-grow">{children}</main>
      <RenderFooter />
      <ChatWidget user={user} />
    </div>
  );
};
