import { cn } from "@/lib/cn";
import { ComponentPropsWithRef, forwardRef } from "react";
import MyHeading from "../ui/heading";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import MyButton from "../ui/button";
import { OrderProduct } from "@/types/order-product.type";
import { useOrderStore } from "@/store/order.store";

type Props = ComponentPropsWithRef<"div"> & {
  orderProduct: OrderProduct;
};
const OrderProductCard = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { orderProduct, className, ...otherProps } = props;
  const [addOrderProduct, removeOrderProduct] = useOrderStore((state) => [
    state.addOrderProduct,
    state.removeOrderProduct,
  ]);
  const productLink = `/product/${orderProduct.product_id}`;
  return (
    <div
      key={orderProduct.product_id}
      ref={ref}
      className={cn(
        "flex flex-col gap-4 rounded-3xl border-2 border-zinc-800 p-6",
        className,
      )}
      {...otherProps}
    >
      <Link to={productLink} className="relative h-full w-full">
        <Star className="absolute -z-10 h-full w-full -rotate-[55deg] fill-zinc-100 stroke-orange-100 px-4" />
        <img
          src={orderProduct.image}
          alt="product"
          className="-rotate-[16deg] scale-x-[-1] transform px-8"
        />
      </Link>
      <div>
        <Link to={productLink}>
          <MyHeading variant={"h6"} className="text-center">
            {orderProduct.title}
          </MyHeading>
        </Link>
        <MyHeading variant={"h6"} className="text-center font-bold">
          {orderProduct.price}$
        </MyHeading>
      </div>

      <div className="flex justify-center gap-4">
        <MyButton
          size={"icon"}
          onClick={() => removeOrderProduct(orderProduct.product_id)}
        >
          -
        </MyButton>
        <MyHeading variant={"h3"}>{orderProduct.count}</MyHeading>
        <MyButton
          size={"icon"}
          onClick={() => addOrderProduct(orderProduct.product_id)}
        >
          +
        </MyButton>
      </div>
    </div>
  );
});

export default OrderProductCard;
