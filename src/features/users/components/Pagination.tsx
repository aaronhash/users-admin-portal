"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  isLastPage?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  isLastPage = false,
}: PaginationProps) {
  const displayPage = Math.min(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      <span
        className="text-sm text-muted-foreground text-center"
        aria-live="polite"
      >
        Page {displayPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage || currentPage >= totalPages || isLoading}
        aria-label="Next page"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
