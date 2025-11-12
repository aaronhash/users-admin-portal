"use client";

import { TableHead } from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SortField, SortOrder } from "../types/user.types";
import { Button } from "@/components/ui/button";

interface SortableTableHeadProps {
  field: SortField;
  label: string;
  currentField: SortField | null;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
  width?: string;
  padLeft?: boolean;
}

export function SortableTableHead({
  field,
  label,
  currentField,
  currentOrder,
  onSort,
  width,
  padLeft,
}: SortableTableHeadProps) {
  const isActive = currentField === field;

  return (
    <TableHead style={{ width }} className={padLeft ? "pl-4" : undefined}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => onSort(field)}
      >
        {label}
        {isActive ? (
          currentOrder === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground/50" />
        )}
      </Button>
    </TableHead>
  );
}
