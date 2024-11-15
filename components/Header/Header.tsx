import { AiFillProduct } from "react-icons/ai";
import { ModeToggle } from "../ModeToggle/ModeToggle";

function Logo() {
  return (
    <div className="flex items-center gap-2 transition-all">
      <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <AiFillProduct className="text-xl" />
      </div>
      <div className="flex items-center gap-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold text-2xl">Inventory App</span>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div>
      <Logo />
      <ModeToggle />
    </div>
  );
}
