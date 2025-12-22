import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "primary-rounded";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  form?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

export const RenderButton = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className,
  type = "button",
  form,
  disabled = false,
  isLoading = false,
  loadingText,
}: ButtonProps) => {
  const variantClasses = {
    primary: "bg-green-primary text-white hover:bg-green-dark",
    secondary: "bg-gray-dark text-white hover:bg-gray-700",
    outline:
      "border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-white",
    "primary-rounded":
      "px-8 py-3 bg-green-primary text-white rounded-full hover:bg-green-dark",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm",
    md: "px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base",
    lg: "px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "font-semibold rounded-md transition-colors duration-200 flex items-center justify-center",
        variantClasses[variant],
        variant !== "primary-rounded" && sizeClasses[size],
        isDisabled && "opacity-50 cursor-not-allowed",
        "active:scale-95",
        className
      )}
    >
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
};
