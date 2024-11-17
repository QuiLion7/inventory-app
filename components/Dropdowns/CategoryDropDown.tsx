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
  { value: "electronics", label: "Eletrônicos" },
  { value: "furniture", label: "Mobiliário" },
  { value: "clothing", label: "Roupas" },
  { value: "books", label: "Livros" },
  { value: "toys", label: "Brinquedos" },
  { value: "beauty", label: "Beleza" },
  { value: "sports", label: "Esportes" },
  { value: "home-decor", label: "Decoração" },
  { value: "home-appliances", label: "Eletrodomésticos" },
  { value: "others", label: "Outros" },
];

export function CategoriesDropDown() {
  const [open, setOpen] = React.useState(false);

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
                    <Checkbox className="size-4 rounded" />
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
              <Button variant="ghost" className="text-xs mb-1">
                Limpar Filtros
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
