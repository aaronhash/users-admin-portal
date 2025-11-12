"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  debounceMs?: number;
}

export function SearchInput({ onSearch, debounceMs = 400 }: SearchInputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs, onSearch]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by name or email..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9"
        aria-label="Search users"
      />
    </div>
  );
}
