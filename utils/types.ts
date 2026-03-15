// Domain Entities
export interface IPost {
  id: string;
  title: string;
  content: string;
  preview: string;
}

export type Blog = IPost & {
  datePosted: string;
  userId: string;
};

export type Draft = IPost & {
  createdOn: string;
  createdBy: string;
};

export type User = {
  id: string; // GUID
  userName: string;
  email: string;
  displayName?: string; // Optional public name for profile display
  avatar?: string; // Optional profile picture URL
  role: "admin" | "user"; // Keep as union type for TypeScript type safety
};

//User Auth
export type LoginRequest = {
  userName: string;
  password: string;
};

export type SignUpRequest = {
  userName: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
};

// Pagination
export type IPagination = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
};
