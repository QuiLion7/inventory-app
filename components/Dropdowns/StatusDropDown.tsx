"use client";

import * as React from "react";

import { FaCheck, FaInbox } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LucideGitPullRequestDraft } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

type Status = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const statuses: Status[] = [
  {
    value: "published",
    label: "Publicado",
    icon: <FaCheck />,
  },
  {
    value: "inactive",
    label: "Inativo",
    icon: <IoClose />,
  },
  {
    value: "draft",
    label: "Rascunho",
    icon: <FaInbox />,
  },
];

export function StatusDropDown() {
  const [open, setOpen] = React.useState(false);

  function returnColor(status: string) {
    switch (status) {
      case "published":
        return "text-green-600 bg-green-100";
      case "inactive":
        return "text-red-600 bg-red-100";
      case "draft":
        return "text-gray-600 bg-gray-100";

      default:
        break;
    }
  }

  return (
    <div className="flex items-center space-x-4 poppins">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="h-10">
            <LucideGitPullRequestDraft />
            Status
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-48 poppins"
          side="bottom"
          align="center"
        >
          <Command className="p-1">
            <CommandList>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    className="h-10 mb-2"
                    value={status.value}
                  >
                    <Checkbox className="size-4 rounded" />
                    <div
                      className={`flex items-center gap-1 ${returnColor(
                        status.value
                      )} p-1 rounded-lg px-4 text-sm`}
                    >
                      {status.icon}
                      {status.label}
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
