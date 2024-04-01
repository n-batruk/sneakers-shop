import { ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "@/lib/cn";
import OrderProductCard from "../cards/order-product-card";
import { useOrderStore } from "@/store/order.store";

type Props = ComponentPropsWithRef<"div"> & {};
const OrderProductCards = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...otherProps } = props;
  const [orderProducts] = useOrderStore((state) => [state.orderProducts]);
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...otherProps}
    >
      {orderProducts.map((orderProduct) => (
        <OrderProductCard orderProduct={orderProduct} />
      ))}
    </div>
  );
});

export default OrderProductCards;
