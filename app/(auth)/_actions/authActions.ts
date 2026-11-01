"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken"
type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
};

export const loginAction = async (
  prevState: LoginState,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Login failed: ${res.status}`);
  }

  const result = await res.json();

  if (result.success && result.data) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      path: "/",
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
    console.log(decodedToken);
    if(decodedToken?.role === "USER"){
      redirect("/user-dashboard");
    }else if(decodedToken.role === "AUTHOR"){
      redirect("/author-dashboard");
    }else if(decodedToken.role === "ADMIN"){
      redirect("/admin-dashboard")
    }
  }
  return {
    success: false,
    statusCode: result.statusCode ?? 400,
    message: result.data?.message ?? "Login failed",
  };
};

// // // result = {
// {
//   "success": true,
//   "statusCode": 200,
//   "message": "user login successfully!",
//   "data": {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwNDAwZWE3LTgzNmYtNDEzNi1iYjJkLTIwOThjNTY1OGY2MCIsIm5hbWUiOiJtb3Vub3RhIiwiZW1haWwiOiJtb3Vub3RhQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzkzMzMyMDE0LCJleHAiOjE3OTMzMzU2MTR9.mo7BF4GzOQYweYlISjz9_gHIQM1WGuXmqD33LG2Qq-U",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwNDAwZWE3LTgzNmYtNDEzNi1iYjJkLTIwOThjNTY1OGY2MCIsIm5hbWUiOiJtb3Vub3RhIiwiZW1haWwiOiJtb3Vub3RhQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzkzMzMyMDE0LCJleHAiOjE3OTM5MzY4MTR9.E6ZIP4jWkH88x_lLoiNcQqKQwgADDMG6k2WrS7r9JMU"
//   }
// }
// // }
