import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn("flex justify-center items-center gap-2 mt-8", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <MdChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page) => {
        // Show first, last, current, and neighbors
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-9 h-9 rounded-md text-sm font-medium transition-colors",
                currentPage === page
                  ? "bg-green-primary text-white"
                  : "border border-gray-300 hover:bg-gray-50 text-gray-700"
              )}
            >
              {page}
            </button>
          );
        }

        // Show ellipsis
        if (
          page === currentPage - 2 ||
          page === currentPage + 2
        ) {
          return <span key={page} className="text-gray-400">...</span>;
        }

        return null;
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <MdChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
