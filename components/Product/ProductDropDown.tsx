import React from "react";
import { MdContentCopy, MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Product } from "./columns";

export default function ProductDropDown({ row }: { row: Row<Product> }) {
  console.log(row);

  const menuItems = [
    { icon: <MdContentCopy />, label: "Copiar", className: "" },
    { icon: <FaRegEdit />, label: "Editar", className: "" },
    { separator: true },
    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Deletar",
      className: "text-red-600",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="poppins">
        {menuItems.map((item, index) =>
          item.separator ? (
            <DropdownMenuSeparator key={index} />
          ) : (
            <DropdownMenuItem
              key={index}
              className={`flex items-center gap-1 p-[10px] ${item.className}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
