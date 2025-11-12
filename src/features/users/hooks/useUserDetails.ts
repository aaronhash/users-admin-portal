import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../api/users-api";

export function useUserDetails(userId: number | null) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId!),
    enabled: !!userId,
  });
}
