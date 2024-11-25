"use client";

import { Product } from "@/components/Product/columns";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import { FaCheck, FaInbox } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function Status({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<Product["status"]>>;
}) {
  console.log(selectedTab);

  return (
    <div>
      <Label className="text-slate-600">Status</Label>
      <Tabs
        value={selectedTab}
        onValueChange={(value: string) =>
          setSelectedTab(value as Product["status"])
        }
        className="mt-1"
      >
        <TabsList className="h-11 px-2 flex justify-start w-full">
          <TabsTrigger
            className={`h-8 ${
              selectedTab === "Publicado" ? "text-red-500" : ""
            }`}
            value="Publicado"
          >
            <FaCheck className="pr-1" />
            Publicado
          </TabsTrigger>
          <TabsTrigger
            className={`h-8 ${selectedTab === "Inativo" ? "text-red-500" : ""}`}
            value="Inativo"
          >
            <IoClose />
            Inativo
          </TabsTrigger>
          <TabsTrigger
            className={`h-8 ${
              selectedTab === "Rascunho" ? "text-red-500" : ""
            }`}
            value="Rascunho"
          >
            <FaInbox className="pr-1" />
            Rascunho
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
