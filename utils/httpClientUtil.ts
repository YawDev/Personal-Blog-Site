import axios from "axios";
import https from "https";

export const createHttpClient = () => {
  const devHttpsAgent =
    process.env.NODE_ENV !== "production"
      ? new https.Agent({ rejectUnauthorized: false })
      : undefined;

  return axios.create({
    httpsAgent: devHttpsAgent,
    timeout: 5000,
    withCredentials: true,
    baseURL: "https://localhost:7052", // Centralized base URL
  });
};
