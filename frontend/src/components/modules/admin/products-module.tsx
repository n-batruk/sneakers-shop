import MyButton from "@/components/ui/button";
import MyHeading from "@/components/ui/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QUERY_KEYS } from "@/constants/app-keys.const";
import { cn } from "@/lib/cn";
import { productService } from "@/services/product/product.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ComponentPropsWithRef, forwardRef, useState } from "react";
import ProductUpdateDialog from "./product-update-dialog";
import ProductCreateDialog from "./product-create-dialog";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

type Props = ComponentPropsWithRef<"div">;

const ProductsModule = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...otherProps } = props;
  const [page, setPage] = useState(1);

  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, page],
    queryFn: () => productService.getAllProducts(page, 5),
  });

  const { mutate } = useMutation({
    mutationKey: [QUERY_KEYS.PRODUCT],
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => refetch(),
    onError: (error: AxiosError | any) =>
      toast.error(error?.response?.data?.message),
  });

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-8", className)}
      {...otherProps}
    >
      <MyHeading variant={"h3"} className="text-center">
        All Products
      </MyHeading>

      <Table className="mx-auto max-w-4xl rounded-3xl">
        <TableHeader>
          <TableRow>
            <TableHead className="">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((product, ind) => (
            <TableRow>
              <TableCell>
                {ind + 1 + data.meta.perPage * (data.meta.currentPage - 1)}
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}$</TableCell>
              <TableCell>
                <ProductUpdateDialog
                  product={product}
                  number={
                    ind + 1 + data.meta.perPage * (data.meta.currentPage - 1)
                  }
                  refetch={refetch}
                />
              </TableCell>
              <TableCell>
                <MyButton
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => mutate(product.id)}
                >
                  <Trash2 />
                </MyButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <ProductCreateDialog refetch={refetch} />
      </div>

      <div className="flex items-center justify-center gap-4">
        {data?.meta.lastPage !== 1
          ? Array.from(
              { length: data?.meta.lastPage ?? 0 },
              (_, index) => index + 1,
            ).map((number) => (
              <MyButton
                size={"icon"}
                variant={page === number ? "default" : "outline"}
                onClick={() => setPage(number)}
              >
                {number}
              </MyButton>
            ))
          : null}
      </div>
    </div>
  );
});

export default ProductsModule;
