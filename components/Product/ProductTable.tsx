import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoClose } from "react-icons/io5";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { StatusDropDown } from "../Dropdowns/StatusDropDown";
import { CategoriesDropDown } from "../Dropdowns/CategoryDropDown";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function FilterArea() {
  return (
    <div className="flex gap-3">
      <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
        <span className="text-gray-600">Status</span>
        <Separator orientation="vertical" />
        <div className="flex gap-2 items-center">
          <Badge variant="secondary">item 1</Badge>
          <Badge variant="secondary">item 1</Badge>
        </div>
      </div>

      <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
        <span className="text-gray-600">Categoria</span>
        <Separator orientation="vertical" />
        <div className="flex gap-2 items-center">
          <Badge variant="secondary">item 1</Badge>
          <Badge variant="secondary">item 1</Badge>
        </div>
      </div>
      <Button variant="ghost" className="p-1 px-2">
        <span>Redefinir</span>
        <IoClose />
      </Button>
    </div>
  );
}
export default function ProductTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <div className="flex flex-col gap-3 mb-8 mt-6">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Pesquisar por nome..."
            className="max-w-sm h-10"
          />
          <div className="flex items-center gap-4">
            <StatusDropDown />
            <CategoriesDropDown />
          </div>
        </div>
        <FilterArea />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
