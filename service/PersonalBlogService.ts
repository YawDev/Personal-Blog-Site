import { ISignUpFormState } from "@/formHelpers/formTypes";
import {
  normalizePosts,
  normalizePost,
  normalizeUser,
} from "@/utils/mapping/mappers";
import {
  Blog,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  User,
} from "@/utils/types";
import axios from "axios";
import https from "https";

const devHttpsAgent =
  process.env.NODE_ENV !== "production"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

const requestConfig = {
  httpsAgent: devHttpsAgent,
  timeout: 5000,
  withCredentials: true,
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

export const LoginApi = async (body: LoginRequest): Promise<LoginResponse> => {
  var res = await axios
    .post("/api/auth/login", body, requestConfig)
    .then((response) => {
      console.log("response", response);
      console.log("User authenticated: ", response.data);
      if (response.status === 401) {
        return {
          status: response.status,
          data: null,
          message: "Credentials failed authentication.",
        };
      } else {
        return {
          status: response.status,
          data: {}, //normalizeUser(response.data),
          message: "Login successful",
        };
      }
    })
    .catch((error) => {
      console.error("Error authenticating user: ", error);
      console.log(error.response);
      if (error.response?.status === 401) {
        return {
          status: error.response?.status,
          data: null,
          message: "Credentials failed authentication.",
        };
      }
      return {
        status: error.response?.status,
        data: null,
        message: "Server is currently down.",
        error: error,
      };
    });

  return res;
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
    .post("https://localhost:7052/api/auth/register", body, requestConfig)
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
    .post("https://localhost:7052/api/auth/logout", null, requestConfig)
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
