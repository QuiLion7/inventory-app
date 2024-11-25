"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import ProductName from "./_components/ProductName";
import Price from "./_components/Price";
import { ProductCategory } from "./_components/ProductCategory";
import Quantity from "./_components/Quantity";
import SKU from "./_components/SKU";
import Status from "./_components/Status";
import Supplier from "./_components/Supplier";
import { z } from "zod";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { icons } from "./Icons";
import { Product } from "../Product/columns";
import { useProductStore } from "@/components/useProductStore";
import { useToast } from "@/hooks/use-toast";

const ProductSchema = z.object({
  productName: z
    .string()
    .min(1, "O nome do produto é necessário")
    .max(100, "O nome do produto deve ter 100 caracteres ou menos"),
  sku: z
    .string()
    .min(1, "SKU é necessário")
    .regex(/^[a-zA-Z0-9-_]+$/, "SKU deve ser alfanumérico"),
  supplier: z
    .string()
    .min(1, "Fornecedor é necessário")
    .max(100, "O nome do fornecedor deve ter 100 caracteres ou menos"),

  quantity: z
    .number()
    .int("A quantidade deve ser um número inteiro")
    .nonnegative("A quantidade não pode ser negativa"),
  price: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", {
      message: "O preço é necessário",
    })
    .transform((val) => {
      if (val === "") return undefined;
      const num = Number(val);
      return Number(num.toFixed(2));
    })
    .pipe(
      z
        .number({
          required_error: "O preço é necessário",
          invalid_type_error: "O preço deve ser um número",
        })
        .nonnegative("O preço não pode ser negativo")
    ),
});

// Define TypeScript type for the form data
type ProductFormData = z.infer<typeof ProductSchema>;

export default function ProductDialog() {
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      sku: "",
      supplier: "",
      quantity: 0,
      price: 0.0,
    },
  });

  const { reset } = methods;

  const [selectedTab, setSelectedTab] =
    useState<Product["status"]>("Publicado");

  const [selectedCategory, setSelectedCategory] =
    useState<Product["category"]>("Eletrônicos");
  const [selectedIcon, setSelectedIcon] = useState<null | ReactNode>(
    icons.find((icon) => icon.isSelected === true)?.icon
  );

  const {
    addProduct,
    isLoading,
    openProductDialog,
    setOpenProductDialog,
    setSelectedProduct,
    selectedProduct,
    updateProduct,
  } = useProductStore();
  const { toast } = useToast();
  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      reset({
        productName: selectedProduct.name,
        sku: selectedProduct.sku,
        supplier: selectedProduct.supplier,
        quantity: selectedProduct.quantityInStock,
        price: selectedProduct.price,
      });
      setSelectedTab(selectedProduct.status);
      setSelectedCategory(selectedProduct.category);
      setSelectedIcon(selectedProduct.icon);
    } else {
      reset({
        productName: "",
        sku: "",
        supplier: "",
        quantity: 0,
        price: 0.0,
      });

      setSelectedTab("Publicado");
      setSelectedCategory("Eletrônicos");
    }
  }, [selectedProduct, openProductDialog]);

  const onSubmit = async (data: ProductFormData) => {
    if (!selectedProduct) {
      const newProduct: Product = {
        id: nanoid(),
        supplier: data.supplier,
        name: data.productName,
        price: data.price,
        quantityInStock: data.quantity,
        sku: data.sku,
        status: selectedTab,
        category: selectedCategory,
        icon: selectedIcon,
        createdAt: new Date(),
      };

      const result = await addProduct(newProduct);

      if (result) {
        toast({
          title: "Sucesso",
          description: "Produto adicionado com sucesso!",
        });
        dialogCloseRef.current?.click();
      }
    } else {
      const productToUpdate: Product = {
        id: selectedProduct.id,
        createdAt: selectedProduct.createdAt,
        supplier: data.supplier,
        name: data.productName,
        price: data.price,
        quantityInStock: data.quantity,
        sku: data.sku,
        status: selectedTab,
        category: selectedCategory,
        icon: selectedIcon,
      };

      const result = await updateProduct(productToUpdate);
      if (result.success) {
        toast({
          title: "Sucesso",
          description: "Produto atualizado com sucesso!",
        });
      } else {
        toast({
          title: "Erro",
          description: "Algo deu errado ao atualizar o produto.",
        });
      }
    }
  };

  function handleReset() {
    reset();
    setSelectedProduct(null);
  }

  function onSelectedIcon(icon: ReactNode) {
    console.log(icon);

    setTimeout(() => {
      setSelectedIcon(icon);
    }, 0);
  }

  return (
    <Dialog open={openProductDialog} onOpenChange={setOpenProductDialog}>
      <DialogTrigger asChild>
        <Button className="h-10">Adicionar Produto</Button>
      </DialogTrigger>
      <DialogContent className="p-5 sm:p-7 px-4 sm:px-8 poppins">
        <DialogHeader>
          <DialogTitle className="text-[22px] ">
            {selectedProduct ? "Editar Produto" : "Adicionar Produto"}
          </DialogTitle>
          <DialogDescription>
            Preencha o formulário para adicionar um novo produto
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-1">
              <div className="grid grid-cols-2 gap-7">
                <ProductName onSelectedIcon={onSelectedIcon} />
                <SKU />
              </div>

              <div className="grid grid-cols-2 gap-5 items-start mt-4">
                <Supplier />
                <ProductCategory
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
              <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Status
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
                <div className="flex justify-center items-center w-full gap-5">
                  <Quantity />
                  <Price />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-9 mb-4 flex gap-4">
              <DialogClose
                ref={dialogCloseRef}
                onClick={() => {
                  handleReset();
                }}
                asChild
              >
                <Button variant={"secondary"} className="h-11 px-11 ">
                  Cancelar
                </Button>
              </DialogClose>

              <Button className="h-11 px-11">
                {isLoading
                  ? "loading..."
                  : `${selectedProduct ? "Editar Produto" : "Add Produto"}`}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
