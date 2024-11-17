"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { FaCheck, FaInbox } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import ProductDropDown from "./ProductDropDown";

export type Product = {
  id: string;
  name: string;
  supplier: string;
  sku: string;
  category:
    | "Eletrônicos"
    | "Mobiliário"
    | "Roupas"
    | "Livros"
    | "Brinquedos"
    | "Beleza"
    | "Esportes"
    | "Decoração"
    | "Eletrodomésticos"
    | "Outros";
  status: "Publicado" | "Inativo" | "Rascunho";
  quantityInStock: number;
  price: number;
  icon: IconType;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const Icon = row.original.icon;
      const name = row.original.name;
      return (
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-sm bg-primary/10">
            <Icon className="text-lg text-primary" />
          </div>
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "Sku",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ getValue }) => `R$${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass;
      let icon: ReactNode;

      switch (status) {
        case "Publicado":
          colorClass = "text-green-600 bg-green-100";
          icon = <FaCheck className="text-xs" />;
          break;
        case "Inativo":
          colorClass = "text-red-600 bg-red-100";
          icon = <IoClose className="text-xs" />;
          break;
        case "Rascunho":
          colorClass = "text-gray-600 bg-gray-200";
          icon = <FaInbox className="text-xs" />;
          break;
        default:
          colorClass = "text-gray-600 bg-gray-200";
          icon = <FaInbox className="text-xs" />;
      }

      return (
        <span
          className={`px-3 py-[2px] rounded-full font-medium ${colorClass} flex gap-1 items-center w-fit`}
        >
          {icon}
          <span className="text-xs">{status}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "quantityInStock",
    header: "Qnt em Estoque",
  },
  {
    accessorKey: "supplier",
    header: "Fornecedor",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ProductDropDown row={row} />;
    },
  },
];
