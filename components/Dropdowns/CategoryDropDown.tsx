"use client";

import * as React from "react";

import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

import { LucideGitPullRequestDraft } from "lucide-react";

type Category = {
  value: string;
  label: string;
};

const categories: Category[] = [
  { value: "eletrônicos", label: "Eletrônicos" },
  { value: "mobiliário", label: "Mobiliário" },
  { value: "roupas", label: "Roupas" },
  { value: "livros", label: "Livros" },
  { value: "brinquedos", label: "Brinquedos" },
  { value: "beleza", label: "Beleza" },
  { value: "esportes", label: "Esportes" },
  { value: "decoração", label: "Decoração" },
  { value: "eletrodomésticos", label: "Eletrodomésticos" },
  { value: "outros", label: "Outros" },
];

type CategoriesDropDownProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

export function CategoriesDropDown({
  selectedCategories,
  setSelectedCategories,
}: CategoriesDropDownProps) {
  const [open, setOpen] = React.useState(false);

  console.log("Selected Categories", selectedCategories);

  function handleCheckboxChange(value: string) {
    console.log("Handling change for category", value);

    setSelectedCategories((prev) => {
      const updateCategories = prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value];

      console.log("Update Categories", updateCategories);
      return updateCategories;
    });
  }

  function clearFilters() {
    setSelectedCategories([]);
  }

  return (
    <div className="flex items-center space-x-4 poppins">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="h-10">
            <LucideGitPullRequestDraft />
            Categorias
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-56 poppins" side="bottom" align="end">
          <Command className="p-1">
            <CommandInput placeholder="Categoria" />
            <CommandList>
              <CommandEmpty className="text-slate-500 text-sm text-center p-5">
                Nenhuma categoria encontrada.
              </CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    className="h-9"
                    value={category.value}
                  >
                    <Checkbox
                      className="size-4 rounded"
                      checked={selectedCategories.includes(category.value)}
                      onClick={() => handleCheckboxChange(category.value)}
                    />
                    <div
                      className={`flex items-center gap-1 p-1 rounded-lg px-3 text-sm`}
                    >
                      {category.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex flex-col gap-2 text-2xl">
              <Separator />
              <Button
                variant="ghost"
                className="text-xs mb-1"
                onClick={() => clearFilters()}
              >
                Limpar Filtros
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
