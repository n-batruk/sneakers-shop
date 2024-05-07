import { cn } from "@/lib/cn";
import { Product } from "@/types/product.type";
import { ComponentPropsWithRef, forwardRef } from "react";
import MyHeading from "../ui/heading";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import MyButton from "../ui/button";
import { useOrderStore } from "@/store/order.store";

type Props = ComponentPropsWithRef<"div"> & {
  product: Product;
};
const ProductCard = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { product, className, ...otherProps } = props;
  const [addOrderProduct] = useOrderStore((state) => [state.addOrderProduct]);
  const productLink = `/product/${product.id}`;
  return (
    <div
      key={product.id}
      ref={ref}
      className={cn(
        "group relative flex flex-col gap-2 rounded-md border p-4",
        className,
      )}
      {...otherProps}
    >
      <div className="flex justify-between">
        <Link to={productLink}>
          <MyHeading variant={"h3"}>{product.title}</MyHeading>
        </Link>

        <Link to={"/order"}>
          <MyButton size={"icon"} onClick={() => addOrderProduct(product.id)}>
            <ShoppingCart className="stroke-white stroke-[2px]" />
          </MyButton>
        </Link>
      </div>

      <Link to={productLink}>
        <MyHeading className="p-1" variant={"h4"}>
          {product.price}$
        </MyHeading>
      </Link>
    </div>
  );
});

export default ProductCard;
