import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <>
    <Navbar user={user}></Navbar>
    {children}
    </>
  )
};

export default DashboardLayout;
