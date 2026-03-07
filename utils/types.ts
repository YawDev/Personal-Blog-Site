export type Blog = {
  id: string;
  title: string;
  content: string;
  datePosted: string;
  preview: string;
};

export type IPagination = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
};
