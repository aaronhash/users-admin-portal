import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/users-api";

export function useUserSearch(query: string, page: number, enabled: boolean) {
  return useQuery({
    queryKey: ["users", "search", query, page],
    queryFn: () => searchUsers(query, page),
    enabled: enabled && query.length > 0,
  });
}
