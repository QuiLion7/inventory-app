import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MdError } from "react-icons/md";
import { IconSelector } from "../IconSelector";
import { useFormContext } from "react-hook-form";
import { ReactNode } from "react";
export default function ProductName({
  onSelectedIcon,
}: {
  onSelectedIcon: (selectedIcon: ReactNode) => void;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  function getSelectedIcon(selectedIcon: ReactNode) {
    onSelectedIcon(selectedIcon);
  }
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="product-name" className="text-slate-600">
        {`Nome`}
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          {...register("productName")}
          type="text"
          id="product-name"
          className="h-11 shadow-none"
          placeholder="Notebook..."
        />
        <IconSelector onUpdateIcon={getSelectedIcon} />
      </div>

      {errors.productName && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <p>O nome do produto é obrigatório</p>
        </div>
      )}
    </div>
  );
}
