"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ProductTable from "../Product/ProductTable";
import { columns } from "../Product/columns";
import ProductDialog from "../ProductDialog/ProductDialog";
import { useProductStore } from "@/components/useProductStore";
import { useEffect } from "react";

export default function Table() {
  const { allProducts, loadProducts } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <Card className="mt-12 flex flex-col shadow-none poppins border-none">
      <CardHeader className="flex justify-between p-2">
        <div className="flex justify-between items-center">
          <div className="">
            <CardTitle className="font-bold text-xl">Produtos</CardTitle>
            <p className="text-sm text-slate-600">
              {allProducts.length} produtos
            </p>
          </div>
          <ProductDialog />
        </div>
      </CardHeader>

      <CardContent>
        <ProductTable data={allProducts} columns={columns} />
      </CardContent>
    </Card>
  );
}
