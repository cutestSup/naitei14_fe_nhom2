import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { useTranslation } from "@/hooks";
import {
  MESSAGE_DEVELOPING,
  CLASS_DISABLED,
  CLASS_SVG_ICON,
  CLASS_NAV_HOVER,
} from "@/constants/common";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "../ui/ThemeToggle";

const MAX_SEARCH_LENGTH = 100;

const handleSanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, "").slice(0, MAX_SEARCH_LENGTH);
};

export const RenderMainHeader = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const debounceTimerRef = useRef<number | null>(null);
  const { totalItems } = useCart();

  useEffect(() => {
    const searchParam = new URLSearchParams(location.search).get("search");
    if (searchParam !== null) {
      setSearchQuery(searchParam);
    } else if (location.pathname !== "/products") {
      setSearchQuery("");
    }
  }, [location]);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (location.pathname === "/products") {
      debounceTimerRef.current = window.setTimeout(() => {
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
          navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`, {
            replace: true,
          });
        } else {
          navigate("/products", { replace: true });
        }
      }, 300);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, navigate, location.pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = handleSanitizeInput(e.target.value);
    setSearchQuery(sanitized);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
    } else {
      navigate("/products");
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-white dark:bg-dark-card shadow-sm relative">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-xl md:text-2xl font-bold text-green-primary">
              Green Shop
            </div>
            <div className="hidden sm:block text-xs text-gray-light">
              {t("header.tagline")}
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-2 text-gray-700">
              <span className="text-sm text-gray-800 dark:text-gray-200">
                (04) 6674 2332
              </span>
              <span className="text-sm text-gray-800 dark:text-gray-200">
                -
              </span>
              <span className="text-sm text-gray-800 dark:text-gray-200">
                (04) 3786 8504
              </span>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden md:block"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={t("header.search")}
                maxLength={MAX_SEARCH_LENGTH}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent"
                aria-label={t("header.search")}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MagnifyingGlassIcon className={CLASS_SVG_ICON} />
              </div>
            </form>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-green-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-md hover:bg-green-dark transition-colors"
            >
              <ShoppingCartIcon className={CLASS_SVG_ICON} />
              <span className="text-sm hidden sm:inline">
                {totalItems} {t("common.products")}
              </span>
              <span className="text-sm sm:hidden">{totalItems}</span>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </Container>

      <nav className="bg-green-primary text-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex justify-between items-center md:hidden py-3">
              <span className="font-bold uppercase">Danh mục</span>
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>

            <div
              className={`
              flex-col md:flex-row md:flex gap-4 md:gap-6 py-4 md:py-3 transition-all duration-300 ease-in-out
              ${
                isMobileMenuOpen
                  ? "flex border-t border-green-600"
                  : "hidden md:flex"
              }
            `}
            >
              <Link to="/" className={`${CLASS_NAV_HOVER} py-2 md:py-0 block`}>
                {t("header.home").toUpperCase()}
              </Link>
              <span
                className={`${CLASS_DISABLED} py-2 md:py-0 block`}
                title={MESSAGE_DEVELOPING}
              >
                {t("header.about").toUpperCase()}
              </span>
              <Link
                to="/products"
                className={`${CLASS_NAV_HOVER} py-2 md:py-0 block`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.products").toUpperCase()}
              </Link>
              <span
                className={`${CLASS_DISABLED} py-2 md:py-0 block`}
                title={MESSAGE_DEVELOPING}
              >
                {t("products.new").toUpperCase()}
              </span>
              <span
                className={`${CLASS_DISABLED} py-2 md:py-0 block`}
                title={MESSAGE_DEVELOPING}
              >
                {t("common.news").toUpperCase()}
              </span>
              <span
                className={`${CLASS_DISABLED} py-2 md:py-0 block`}
                title={MESSAGE_DEVELOPING}
              >
                {t("header.contact").toUpperCase()}
              </span>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};
