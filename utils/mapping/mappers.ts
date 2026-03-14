import { Blog } from "../types";

export const normalizePosts = (payload: any): Blog[] => {
  const data = payload?.blogs || [];

  return data.map((item: any) => ({
    id: item.id || item.id,
    title: item.title || item.Title,
    content: item.content || item.Content,
    preview: item.preview || item.Preview,
    datePosted: item.datePosted || item.DatePosted,
    userId: item.userId || item.UserId,
  }));
};

export const normalizePost = (payload: any): Blog => {
  const data = payload?.blog;
  console.log("title-get-by-id: ", data.title);
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    preview: data.preview,
    datePosted: data.datePosted,
    userId: data.userId,
  };
};
