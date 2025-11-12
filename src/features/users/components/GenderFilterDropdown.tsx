"use client";

import { TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Check } from "lucide-react";
import { GenderFilter } from "../types/user.types";

interface GenderFilterDropdownProps {
  value: GenderFilter;
  onChange: (filter: GenderFilter) => void;
  width?: string;
}

export function GenderFilterDropdown({
  value,
  onChange,
  width,
}: GenderFilterDropdownProps) {
  const getFilterIconClass = () => {
    if (value === "male") return "text-blue-500 fill-blue-500";
    if (value === "female") return "text-pink-500 fill-pink-500";
    return "text-muted-foreground";
  };

  return (
    <TableHead style={{ width }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            Gender
            <Filter className={`ml-2 h-4 w-4 ${getFilterIconClass()}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => onChange("all")}
            className="cursor-pointer"
          >
            <Check
              className={`mr-2 h-4 w-4 ${
                value === "all" ? "opacity-100" : "opacity-0"
              }`}
            />
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onChange("male")}
            className="cursor-pointer"
          >
            <Check
              className={`mr-2 h-4 w-4 text-blue-500 ${
                value === "male" ? "opacity-100" : "opacity-0"
              }`}
            />
            <span
              className={value === "male" ? "text-blue-600 font-medium" : ""}
            >
              Male
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onChange("female")}
            className="cursor-pointer"
          >
            <Check
              className={`mr-2 h-4 w-4 text-pink-500 ${
                value === "female" ? "opacity-100" : "opacity-0"
              }`}
            />
            <span
              className={value === "female" ? "text-pink-600 font-medium" : ""}
            >
              Female
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );
}
