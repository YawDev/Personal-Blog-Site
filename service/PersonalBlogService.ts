import { Blog } from "@/utils/types";
import axios from "axios";
import https from "https";

const devHttpsAgent =
  process.env.NODE_ENV !== "production"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

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

export const GetAllPosts = async (): Promise<Blog[]> => {
  var posts = await axios
    .get("https://localhost:7052/blogs", { httpsAgent: devHttpsAgent })
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
