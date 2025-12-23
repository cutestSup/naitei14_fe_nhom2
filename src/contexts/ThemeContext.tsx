// src/contexts/ThemeContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // 1. Khởi tạo state: Lấy từ localStorage hoặc theo cài đặt hệ thống
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) return savedTheme;

    // Nếu chưa lưu, kiểm tra xem máy tính người dùng có đang để Dark mode không
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  // 2. Effect: Cập nhật class vào thẻ HTML mỗi khi theme thay đổi
  useEffect(() => {
    const root = window.document.documentElement;

    // Xóa lớp cũ để tránh trùng lặp
    root.classList.remove("light", "dark");

    // Thêm lớp mới
    root.classList.add(theme);

    // Lưu vào LocalStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
