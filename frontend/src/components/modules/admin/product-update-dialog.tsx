import MyButton from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import MyHeading from "@/components/ui/heading";
import { MyInput } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QUERY_KEYS } from "@/constants/app-keys.const";
import { productService } from "@/services/product/product.service";
import { Product } from "@/types/product.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Pen } from "lucide-react";
import { ComponentPropsWithRef, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = ComponentPropsWithRef<"div"> & {
  refetch: () => void;
  number: number;
  product: Product;
};

const ProductUpdateDialog = (props: Props) => {
  const { product, number, refetch } = props;
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(product.description);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);

  const { mutate } = useMutation({
    mutationKey: [QUERY_KEYS.PRODUCT, product.id],
    mutationFn: () =>
      productService.updateProduct(product.id, { description, price, title }),
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
    onError: (error: AxiosError | any) =>
      toast.error(error?.response?.data?.message),
  });

  useEffect(() => {
    setDescription(product.description);
    setTitle(product.title);
    setPrice(product.price);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <MyButton size={"icon"} variant={"outline"}>
          <Pen />
        </MyButton>
      </DialogTrigger>
      <DialogContent className=" max-w-3xl space-y-2">
        <DialogHeader>
          <MyHeading variant={"h4"}>Update product #{number}</MyHeading>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <MyHeading variant={"h6"}>Title</MyHeading>
          <MyInput
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </div>

        <div className="flex items-center gap-4">
          <MyHeading variant={"h6"}>Description</MyHeading>
          <Textarea
            className="min-h-28"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </div>
        <div className="flex items-center gap-4">
          <MyHeading variant={"h6"}>Price</MyHeading>
          <MyInput
            type="number"
            onChange={(event) => setPrice(Number(event.target.value))}
            value={price}
          />
        </div>
        <MyButton onClick={() => mutate()}>Update</MyButton>
      </DialogContent>
    </Dialog>
  );
};

export default ProductUpdateDialog;
