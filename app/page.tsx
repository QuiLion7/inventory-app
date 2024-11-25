"use client";

import Header from "@/components/Header/Header";
import { DeleteDialog } from "@/components/Product/DeleteDialog";
import Table from "@/components/Table/Table";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-50";

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={`poppins p-3 ${bgColor} border min-h-screen`}>
      <Card className="flex flex-col shadow-none p-2">
        <DeleteDialog />
        <Header />
        <Table />
      </Card>
    </div>
  );
}
