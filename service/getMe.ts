"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
    const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/users/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["myy-profile"]
      }
    }
  );

  if (!res.ok) {
    return null;
  }

  const result = await res.json();

  console.log(result);

  return result.data;
}