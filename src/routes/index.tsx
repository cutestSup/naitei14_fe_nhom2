import { createBrowserRouter, Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { RenderHome } from "@/features/home";
import {
  RegisterPage,
  ActivatePage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ChangePasswordPage,
} from "@/features/auth";
import { RenderProducts } from "@/features/product-list";
import { RenderProductDetail } from "@/features/product-detail";
import { ProfilePage } from "@/features/profile";
import { CartPage } from "@/features/cart";

const LayoutWrapper = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
    children: [
      {
        path: "/",
        element: <RenderHome />,
      },
      {
        path: "auth/register",
        element: <RegisterPage />,
      },
      {
        path: "auth/activate",
        element: <ActivatePage />,
      },
      {
        path: "auth/login",
        element: <LoginPage />,
      },
      {
        path: "auth/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "auth/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "auth/change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "/products",
        element: <RenderProducts />,
      },
      {
        path: "/products/:id",
        element: <RenderProductDetail />,
      },
      {
        path: "/profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
]);
