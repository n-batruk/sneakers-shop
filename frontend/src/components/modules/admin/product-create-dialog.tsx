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
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ComponentPropsWithRef, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = ComponentPropsWithRef<"div"> & {
  refetch: () => void;
};

const ProductCreateDialog = (props: Props) => {
  const { refetch } = props;
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const { mutate } = useMutation({
    mutationKey: [QUERY_KEYS.PRODUCT],
    mutationFn: () =>
      productService.createProduct({ description, price, title }),
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
    onError: (error: AxiosError | any) =>
      toast.error(error?.response?.data?.message),
  });

  useEffect(() => {
    setDescription("");
    setTitle("");
    setPrice(0);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <MyButton size={"lg"}>Create new</MyButton>
      </DialogTrigger>
      <DialogContent className=" max-w-3xl space-y-2">
        <DialogHeader>
          <MyHeading variant={"h4"}>Create new product</MyHeading>
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
        <MyButton onClick={() => mutate()}>Create</MyButton>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCreateDialog;
