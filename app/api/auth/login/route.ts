import { normalizeUser } from "@/utils/mapping/mappers";
import { UpstreamLoginResponse } from "@/utils/types";
import { NextResponse } from "next/server";
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axios.post(
      "https://localhost:7052/api/auth/login",
      body,
      {
        ...requestConfig,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data: UpstreamLoginResponse = response.data;

    console.log("Request body:", body);
    console.log("Backend response status:", response.status);
    console.log("Backend response data:", data);

    console.log("bff call", data);
    console.log("Attempting to normalize user data...");
    console.log("Data structure:", JSON.stringify(data, null, 2));

    const normalizedUser = normalizeUser(data);
    console.log("Normalized user:", normalizedUser);

    return NextResponse.json(
      {
        status: 200,
        data: normalizedUser,
        message: "Login successful",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("=== LOGIN API ROUTE ERROR ===");
    console.error("Error details:", error);

    // Handle axios errors specifically
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const errorData = error.response?.data || {};

      console.error("Backend response status:", status);
      console.error("Backend response data:", errorData);

      return NextResponse.json(
        {
          status,
          data: null,
          message: errorData?.message ?? "Login failed",
        },
        { status },
      );
    }

    // Handle other errors
    console.error(
      "Error message:",
      error instanceof Error ? error.message : "Unknown error",
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace",
    );

    return NextResponse.json(
      {
        status: 500,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : "An error occurred during login.",
      },
      { status: 500 },
    );
  }
}
