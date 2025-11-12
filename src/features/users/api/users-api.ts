import {
  User,
  UsersResponse,
  GenderFilter,
  SortField,
  SortOrder,
} from "../types/user.types";

const BASE_URL = "https://dummyjson.com";

export async function fetchUsers(
  page: number,
  limit: number = 10,
  gender?: GenderFilter,
  sortBy?: SortField,
  sortOrder?: SortOrder
): Promise<UsersResponse> {
  const skip = (page - 1) * limit;

  let url = "";
  const params = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
  });

  if (sortBy) {
    params.append("sortBy", sortBy);
    params.append("order", sortOrder || "asc");
  }

  if (gender && gender !== "all") {
    url = `${BASE_URL}/users/filter?key=gender&value=${gender}&${params.toString()}`;
  } else {
    url = `${BASE_URL}/users?${params.toString()}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function searchUsers(
  query: string,
  page: number,
  limit: number = 10
): Promise<UsersResponse> {
  const skip = (page - 1) * limit;
  const response = await fetch(
    `${BASE_URL}/users/search?q=${encodeURIComponent(
      query
    )}&limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Failed to search users");
  }

  return response.json();
}

export async function fetchUserById(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return response.json();
}
