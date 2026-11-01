"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
    const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return null;
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refreshToken`,
    {
      headers: {
        Authorization: `refreshToken=${refreshToken}`,
      },
      cache: "no-store"
    }
  );

  if (!res.ok) {
    return null;
  }

  const result = await res.json();

  console.log(result);

  return result.data;
}