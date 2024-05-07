import MyButton from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import MyHeading from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUERY_KEYS } from "@/constants/app-keys.const";
import { orderService } from "@/services/order/order.service";
import {
  DeliveryStatusType,
  Order,
  PaymentStatusType,
} from "@/types/order.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Pen } from "lucide-react";
import { ComponentPropsWithRef, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = ComponentPropsWithRef<"div"> & {
  refetch: () => void;
  number: number;
  order: Order;
};

const OrderDialog = (props: Props) => {
  const { order, number, refetch } = props;

  const [payment, setPayment] = useState<PaymentStatusType>(
    order.payment.status,
  );
  const [delivery, setDelivery] = useState<DeliveryStatusType>(
    order.delivery.status,
  );

  const [open, setOpen] = useState(false);

  const { mutate } = useMutation({
    mutationKey: [QUERY_KEYS.ORDER, order.id],
    mutationFn: () =>
      orderService.updateOrder(
        {
          payment_status: payment,
          delivery_status: delivery,
        },
        order.id,
      ),
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
    onError: (error: AxiosError | any) =>
      toast.error(error?.response?.data?.message),
  });

  useEffect(() => {
    setPayment(order.payment.status);
    setDelivery(order.delivery.status);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <MyButton size={"icon"} variant={"outline"}>
          <Pen />
        </MyButton>
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <MyHeading variant={"h4"}>Update order #{number}</MyHeading>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <MyHeading variant={"h6"}>Payment</MyHeading>
          <Select
            onValueChange={(value) => setPayment(value as PaymentStatusType)}
            value={payment}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="INPROGRESS">In progress</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <MyHeading variant={"h6"}>Delivery</MyHeading>
          <Select
            onValueChange={(value) => setDelivery(value as DeliveryStatusType)}
            value={delivery}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="INPROGRESS">In progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <MyButton onClick={() => mutate()}>Update</MyButton>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
