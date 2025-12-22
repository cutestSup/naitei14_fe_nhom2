import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts";
import { Container } from "@/components/ui/Container";
import { CartItemRow } from "./components/CartItemRow";
import { CartSummary } from "./components/CartSummary";
import { Link, useNavigate } from "react-router-dom";
import { RenderButton } from "@/components/ui/Button";
import { useTranslation } from "@/hooks";

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } =
    useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  if (cart.length === 0) {
    return (
      <Container className="py-20 text-center">
        <div className="flex flex-col items-center justify-center">
          <img src="/images/empty_cart.jpg" alt={t("cart.empty")} className="mb-6" />
          <Link to="/products">
            <RenderButton
              variant="outline"
              className="px-6 py-2 rounded transition uppercase text-green-primary border-green-primary hover:bg-green-primary hover:text-white"
            >
              {t("cart.continueShopping")}
            </RenderButton>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-10 bg-white">
      <Container>
        <div className="mb-8">
          <h1 className="text-xl font-medium text-green-primary uppercase">
            {t("cart.cartTitle")}
          </h1>
        </div>

        {/* Bảng sản phẩm */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-primary text-white text-sm uppercase">
                <th className="py-3 px-4 font-medium w-[15%] border-r border-white text-center">
                  {t("cart.image")}
                </th>
                <th className="py-3 px-4 font-medium w-[30%] border-r border-white text-center">
                  {t("cart.productName")}
                </th>
                <th className="py-3 px-4 font-medium w-[15%] border-r border-white text-center">
                  {t("cart.unitPrice")}
                </th>
                <th className="py-3 px-4 font-medium w-[20%] border-r border-white text-center">
                  {t("cart.quantity")}
                </th>
                <th className="py-3 px-4 font-medium w-[15%] border-r border-white text-center">
                  {t("cart.itemTotal")}
                </th>
                <th className="py-3 px-4 font-medium w-[5%] text-center">
                  {t("cart.delete")}
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-4 mt-6">
          <RenderButton
            variant="outline"
            className="uppercase text-green-primary border-green-primary rounded-full px-6"
            onClick={() => {
              if (window.confirm(t("cart.confirmCancelOrder"))) {
                clearCart();
              }
            }}
          >
            {t("cart.cancelOrder")}
          </RenderButton>
          <Link to="/products">
            <RenderButton className="uppercase bg-green-primary hover:bg-green-dark text-white rounded-full px-6">
              {t("cart.continueShoppingButton")}
            </RenderButton>
          </Link>
        </div>

        {/* Tổng tiền */}
        <CartSummary totalPrice={totalPrice} />
      </Container>
    </section>
  );
};
