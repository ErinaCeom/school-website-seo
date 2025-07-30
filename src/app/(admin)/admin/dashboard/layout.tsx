import React, { ReactNode } from "react";
import BottomNav from "@/components/admin/BottomNav";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}
