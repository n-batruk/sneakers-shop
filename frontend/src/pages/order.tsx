import Header from "../components/modules/header";
import Footer from "../components/modules/footer";
import { useOrderStore } from "@/store/order.store";
import { useEffect, useState } from "react";
import MyButton from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product/product.service";
import { QUERY_KEYS } from "@/constants/app-keys.const";
import OrderProductCards from "@/components/modules/order-product-cards";
import MyHeading from "@/components/ui/heading";
import { useUserStore } from "@/store/user.store";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateOdrderBody } from "@/services/order/order.types";
import { orderService } from "@/services/order/order.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { MyInput } from "@/components/ui/input";

function OrderPage() {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 0],
    queryFn: () => productService.getAllProducts(0, 100),
    enabled: true,
  });

  const { mutate } = useMutation({
    mutationKey: [QUERY_KEYS.ORDER],
    mutationFn: (body: CreateOdrderBody) => orderService.createOrder(body),
    onSuccess: () => {
      clearOrderProducts();
      setOpen(false);
    },
    onError: (error: AxiosError | any) =>
      toast.error(error?.response?.data?.message),
  });
  const [token] = useUserStore((state) => [state.token]);
  const [orderProducts, paymentAmount, setOrderProducts, clearOrderProducts] =
    useOrderStore((state) => [
      state.orderProducts,
      state.paymentAmount,
      state.setOrderProducts,
      state.clearOrderProducts,
    ]);

  useEffect(() => {
    if (data?.data.length) {
      setOrderProducts(data?.data ?? []);
    }
  }, [data]);

  const form = useForm({
    defaultValues: {
      delivery_address: "",
    },
  });

  const onSubmit: SubmitHandler<{ delivery_address: string }> = (data) => {
    mutate({
      delivery_address: data.delivery_address,
      order_products: orderProducts
        .map((op) => ({
          count: op.count,
          price: op.price,
          product_id: op.product_id,
        }))
        .filter((op) => op.count),
      payment_amount: paymentAmount,
    });
  };
  return (
    <>
      <main className="h-svh w-full">
        <div className="flex justify-center px-8 py-10">
          <div className="w-full max-w-5xl space-y-24">
            <Header />
            <OrderProductCards />
            {!token ? (
              <MyHeading variant={"h4"} className="text-center">
                Щоб замовити, вам потрібно зареєструватися
              </MyHeading>
            ) : null}
            <div className="flex items-center justify-between px-24">
              <MyHeading variant={"h3"}> Amount: {paymentAmount}$</MyHeading>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger disabled={!token}>
                  <MyButton
                    className="h-20 rounded-md px-24 text-3xl"
                    disabled={!token}
                  >
                    Замовити
                  </MyButton>
                </DialogTrigger>
                <DialogContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className=" w-full max-w-lg space-y-8"
                    >
                      <MyHeading variant={"h3"}>
                        Замовлення ({paymentAmount}$)
                      </MyHeading>
                      <FormField
                        control={form.control}
                        name="delivery_address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Адреса доставки</FormLabel>
                            <FormControl>
                              <MyInput
                                placeholder="Some address..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <MyButton size={"lg"} type="submit">
                        Замовити
                      </MyButton>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderPage;
