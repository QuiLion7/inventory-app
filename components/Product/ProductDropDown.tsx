import { Row } from "@tanstack/react-table";
import { Product } from "./columns";

import { FaRegEdit } from "react-icons/fa";
import { MdContentCopy, MdOutlineDelete } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useProductStore } from "../useProductStore";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/use-toast";

type MenuItem = {
  icon: JSX.Element;
  label: string;
  className: string;
  separator?: undefined;
};

export default function ProductDropDown({ row }: { row: Row<Product> }) {
  const {
    setSelectedProduct,
    setOpenDialog,
    setOpenProductDialog,
    addProduct,
  } = useProductStore();

  const { toast } = useToast();
  const menuItems: MenuItem[] = [
    { icon: <MdContentCopy />, label: "Copiar", className: "" },
    { icon: <FaRegEdit />, label: "Editar", className: "" },

    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Deletar",
      className: "text-red-600",
    },
  ];

  async function handleClickedItem(item: MenuItem) {
    if (item.label === "Deletar") {
      setOpenDialog(true);
      setSelectedProduct(row.original);
    }

    if (item.label === "Copiar") {
      const productToCopy: Product = {
        ...row.original,
        id: nanoid(),
        name: `${row.original.name} (copiado)`,
        createdAt: new Date(),
      };

      const result = await addProduct(productToCopy);

      if (result) {
        toast({
          title: "Copiado com sucesso",
          description: "O produto foi copiado com sucesso",
        });
      }
    }

    if (item.label === "Editar") {
      setOpenProductDialog(true);
      setSelectedProduct(row.original);
    }
  }

  return (
    <div>
      <DropdownMenu>
        {/* Trigger drop down which is the more icon */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
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
                onClick={() => handleClickedItem(item)}
              >
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
