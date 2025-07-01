import React from "react";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "All Notice",
    description: "Find all notices",
  }
};

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  return { children };
}
