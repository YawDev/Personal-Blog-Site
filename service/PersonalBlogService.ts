import { Blog } from "@/utils/types";
import axios from "axios";
import https from "https";

const devHttpsAgent =
  process.env.NODE_ENV !== "production"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

const requestConfig = {
  httpsAgent: devHttpsAgent,
  timeout: 5000,
};

export const GetAllPosts = async (): Promise<Blog[]> => {
  var posts = await axios
    .get("https://localhost:7052/blogs", requestConfig)
    .then((response) => {
      console.log("Fetched posts:", response.data);
      return normalizePosts(response.data);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      return [];
    });
  return posts;
};

export const GetPostsById = async (id: string): Promise<Blog | null> => {
  var post = await axios
    .get(`https://localhost:7052/blogs/${id}`, requestConfig)
    .then((response) => {
      console.log("Fetched post by Id: ", response.data);
      return response.data as Blog;
    })
    .catch((error) => {
      console.error("Error fetching post: ", error);
      return null;
    });
  return post as Blog;
};

const normalizePosts = (payload: unknown): Blog[] => {
  if (Array.isArray(payload)) {
    return payload as Blog[];
  }

  if (payload && typeof payload === "object") {
    const candidateKeys = ["blogs", "posts", "data", "items"] as const;
    for (const key of candidateKeys) {
      const value = (payload as Record<string, unknown>)[key];
      if (Array.isArray(value)) {
        return value as Blog[];
      }
    }
  }

  return [];
};
