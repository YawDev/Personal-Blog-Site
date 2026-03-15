import { ISignUpFormState } from "@/formHelpers/formTypes";
import {
  normalizePosts,
  normalizePost,
  normalizeUser,
} from "@/utils/mapping/mappers";
import { Blog, LoginRequest, SignUpRequest, User } from "@/utils/types";
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
      return normalizePost(response.data);
    })
    .catch((error) => {
      console.error("Error fetching post: ", error);
      return null;
    });
  return post;
};

export const LoginApi = async (body: LoginRequest): Promise<User | null> => {
  var user = await axios
    .post("https://localhost:7052/auth/login", body, requestConfig)
    .then((response) => {
      console.log("User authenticated: ", response.data);
      return normalizeUser(response.data);
    })
    .catch((error) => {
      console.error("Error authenticating user: ", error);
      return null;
    });
  return user;
};

export const SignUpApi = async (data: ISignUpFormState): Promise<boolean> => {
  let body: SignUpRequest = {
    userName: data.userName.value,
    password: data.password.value,
    confirmPassword: data.confirmPassword.value,
    email: data.email.value,
    firstName: data.firstName.value,
    lastName: data.lastName.value,
  };

  var user = await axios
    .post("https://localhost:7052/auth/register", body, requestConfig)
    .then((response) => {
      console.log("Account successfully registered!");
      return response.data;
    })
    .catch((error) => {
      console.error("Error signing up user: ", error);
      return null;
    });
  return user;
};

export const logoutApi = async (): Promise<boolean> => {
  var user = await axios
    .post("https://localhost:7052/auth/logout", null, requestConfig)
    .then((response) => {
      console.log("logout success");
      return response.data;
    })
    .catch((error) => {
      console.error("Error logging out: ", error);
      return null;
    });
  return user;
};
