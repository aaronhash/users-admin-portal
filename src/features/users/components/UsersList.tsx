"use client";

import { useCallback, useMemo, useState } from "react";
import { useUsers, useUserSearch } from "../hooks";
import { SearchInput } from "./SearchInput";
import { UsersTable } from "./UsersTable";
import { Pagination } from "./Pagination";
import { UserDetailsDialog } from "./UserDetailsDialog";
import {
  GenderFilter as GenderFilterType,
  SortConfig,
  SortField,
} from "../types/user.types";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const PAGE_SIZE = 10;
const SORT_LABELS: Record<SortField, string> = {
  firstName: "Name",
  email: "Email",
  age: "Age",
};
const ORDER_LABELS: Record<SortConfig["order"], string> = {
  asc: "ascending",
  desc: "descending",
};

export function UsersList() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<GenderFilterType>("all");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    order: "asc",
  });

  const isSearching = searchQuery.length > 0;

  const listQuery = useUsers(
    page,
    genderFilter,
    sortConfig.field || undefined,
    sortConfig.order
  );
  const searchQueryResult = useUserSearch(searchQuery, page, isSearching);

  const activeQuery = isSearching ? searchQueryResult : listQuery;
  const activeData = activeQuery.data;
  const { refetch: refetchUsers } = listQuery;
  const { refetch: refetchSearch } = searchQueryResult;

  const baseUsers = useMemo(() => activeData?.users ?? [], [activeData?.users]);

  const users = useMemo(() => {
    if (isSearching && genderFilter !== "all") {
      return baseUsers.filter((user) => user.gender === genderFilter);
    }
    return baseUsers;
  }, [baseUsers, genderFilter, isSearching]);

  const pagination = useMemo(() => {
    const total = activeData?.total ?? 0;
    const skip = activeData?.skip ?? (page - 1) * PAGE_SIZE;
    const totalPages = total > 0 ? Math.ceil(total / PAGE_SIZE) : 0;
    const currentPage =
      totalPages > 0 ? Math.floor(skip / PAGE_SIZE) + 1 : page;
    const isLastPage =
      totalPages > 0 ? skip + baseUsers.length >= total : false;
    const hideForClientFilteredEmpty =
      isSearching && genderFilter !== "all" && users.length === 0;

    return {
      currentPage,
      totalPages,
      isLastPage,
      show: total > 0 && totalPages > 0 && !hideForClientFilteredEmpty,
    };
  }, [
    activeData?.skip,
    activeData?.total,
    baseUsers.length,
    genderFilter,
    isSearching,
    page,
    users.length,
  ]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleGenderFilterChange = useCallback((filter: GenderFilterType) => {
    setGenderFilter(filter);
    setPage(1);
  }, []);

  const handleSort = useCallback((field: SortField) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        if (prev.order === "asc") {
          return { field, order: "desc" };
        }
        return { field: null, order: "asc" };
      }
      return { field, order: "asc" };
    });
    setPage(1);
  }, []);

  const handleUserClick = useCallback((userId: number) => {
    setSelectedUserId(userId);
  }, []);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setSelectedUserId(null);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (isSearching) {
      refetchSearch();
    } else {
      refetchUsers();
    }
  }, [isSearching, refetchSearch, refetchUsers]);

  const showSortSummary = Boolean(sortConfig.field || genderFilter !== "all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput onSearch={handleSearch} />
        {showSortSummary && (
          <div className="text-sm text-muted-foreground">
            {sortConfig.field && (
              <>
                Sorted by {SORT_LABELS[sortConfig.field]} (
                {ORDER_LABELS[sortConfig.order]})
              </>
            )}
            {sortConfig.field && genderFilter !== "all" && ", "}
            {genderFilter !== "all" && (
              <>
                Filter by Gender ({genderFilter === "male" ? "Male" : "Female"})
              </>
            )}
          </div>
        )}
      </div>

      {activeQuery.error ? (
        <div className="flex items-center justify-between rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-sm font-medium text-destructive">
              Failed to load users. Please try again.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            Retry
          </Button>
        </div>
      ) : (
        <UsersTable
          users={users}
          onUserClick={handleUserClick}
          isLoading={activeQuery.isLoading}
          sortField={sortConfig.field}
          sortOrder={sortConfig.order}
          onSort={handleSort}
          genderFilter={genderFilter}
          onGenderFilterChange={handleGenderFilterChange}
        />
      )}

      {pagination.show && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          isLoading={activeQuery.isLoading}
          isLastPage={pagination.isLastPage}
        />
      )}

      <UserDetailsDialog
        userId={selectedUserId}
        open={selectedUserId !== null}
        onOpenChange={handleDialogOpenChange}
      />
    </div>
  );
}
