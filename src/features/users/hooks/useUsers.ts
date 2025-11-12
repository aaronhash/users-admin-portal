import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users-api";
import { GenderFilter, SortField, SortOrder } from "../types/user.types";

export function useUsers(
  page: number,
  gender: GenderFilter = "all",
  sortBy?: SortField,
  sortOrder?: SortOrder
) {
  return useQuery({
    queryKey: ["users", page, gender, sortBy, sortOrder],
    queryFn: () => fetchUsers(page, 10, gender, sortBy, sortOrder),
  });
}
