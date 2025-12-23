import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CLASS_FLEX_ITEMS_GAP2 } from "@/constants/common";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav
      className={cn("text-sm text-gray-600 dark:text-gray-300 mb-4", className)}
      aria-label="Breadcrumb"
    >
      <ol className={`${CLASS_FLEX_ITEMS_GAP2} flex-wrap`}>
        {items.map((item, index) => (
          <li
            key={index}
            className={`${CLASS_FLEX_ITEMS_GAP2} whitespace-nowrap`}
          >
            {index > 0 && (
              <svg
                className="w-3 h-3 md:w-4 md:h-4 text-gray-400 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            {item.path ? (
              <Link
                to={item.path}
                className="hover:text-green-primary transition-colors text-xs md:text-sm"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800 dark:text-gray-200 font-medium text-xs md:text-sm">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
