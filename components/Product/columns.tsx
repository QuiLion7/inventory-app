"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import React, { ReactNode } from "react";
import { FaCheck, FaInbox } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import ProductDropDown from "./ProductDropDown";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
  icon: ReactNode;
  createdAt: Date;
};

type SortableHeaderProps = {
  column: Column<Product, unknown>;
  label: string;
};

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label }) => {
  const isSorted = column.getIsSorted();
  const SortingIcon =
    isSorted === "asc"
      ? IoMdArrowDown
      : isSorted === "desc"
      ? IoMdArrowUp
      : ArrowUpDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="" asChild>
        <div
          className={`flex items-start py-[14px] select-none cursor-pointer  p-2 gap-1 ${
            isSorted && "text-primary"
          }`}
          aria-label={`Classificar por ${label}`}
        >
          {label}
          <SortingIcon className=" h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <IoMdArrowUp className="mr-2 h-4 w-4" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <IoMdArrowDown className="mr-2 h-4 w-4" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => {
      const Icon = row.original.icon;
      const name = row.original.name;
      return (
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-sm bg-primary/10 text-primary">
            {Icon}
          </div>
          <span>{name}</span>
        </div>
      );
    },
    header: ({ column }) => <SortableHeader column={column} label="Nome" />,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <SortableHeader column={column} label="sku" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column} label="Created At" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return (
        <span>
          {date.toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <SortableHeader column={column} label="Preço" />,
    cell: ({ getValue }) => `R$${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "category",
    filterFn: "multiSelect",
    header: ({ column }) => (
      <SortableHeader column={column} label="Categoria" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    filterFn: "multiSelect",
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
    header: ({ column }) => (
      <SortableHeader column={column} label="Qnt em Estoque" />
    ),
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => <SortableHeader column={column} label="supplier" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ProductDropDown row={row} />;
    },
  },
];
