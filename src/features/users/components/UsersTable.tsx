"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, SortField, SortOrder, GenderFilter } from "../types/user.types";
import { SortableTableHead } from "./SortableTableHead";
import { GenderFilterDropdown } from "./GenderFilterDropdown";
import { Loader2 } from "lucide-react";

interface UsersTableProps {
  users: User[];
  onUserClick: (userId: number) => void;
  isLoading?: boolean;
  sortField: SortField | null;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  genderFilter: GenderFilter;
  onGenderFilterChange: (filter: GenderFilter) => void;
}

export function UsersTable({
  users,
  onUserClick,
  isLoading,
  sortField,
  sortOrder,
  onSort,
  genderFilter,
  onGenderFilterChange,
}: UsersTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <div
          className="flex items-center justify-center"
          style={{ height: "409.5px" }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-md border">
        <div
          className="flex items-center justify-center"
          style={{ height: "409.5px" }}
        >
          <div className="text-center">
            <p className="text-lg font-semibold">No users found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="w-full overflow-x-auto">
        <Table className="table-fixed min-w-[640px]">
          <TableHeader>
            <TableRow>
              <SortableTableHead
                field="firstName"
                label="Name"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={onSort}
                width="20%"
                padLeft
              />
              <SortableTableHead
                field="email"
                label="Email"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={onSort}
                width="28%"
              />
              <TableHead
                style={{ width: "20%" }}
                className="hidden md:table-cell"
              >
                Phone
              </TableHead>
              <GenderFilterDropdown
                value={genderFilter}
                onChange={onGenderFilterChange}
                width="17%"
              />
              <SortableTableHead
                field="age"
                label="Age"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={onSort}
                width="15%"
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => onUserClick(user.id)}
                className="cursor-pointer hover:bg-muted/50"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onUserClick(user.id);
                  }
                }}
                role="button"
                aria-label={`View details for ${user.firstName} ${user.lastName}`}
              >
                <TableCell className="font-medium truncate pl-3.5">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="truncate">{user.email}</TableCell>
                <TableCell className="truncate hidden md:table-cell">
                  {user.phone}
                </TableCell>
                <TableCell className="capitalize">{user.gender}</TableCell>
                <TableCell>{user.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
