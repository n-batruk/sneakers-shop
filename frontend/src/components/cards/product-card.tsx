import { cn } from "@/lib/cn";
import { Product } from "@/types/product.type";
import { ComponentPropsWithRef, forwardRef } from "react";
import MyHeading from "../ui/heading";
import { ShoppingCart, Star } from "lucide-react";
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
      className={cn("group relative flex flex-col gap-4", className)}
      {...otherProps}
    >
      <Link to={productLink}>
        <MyHeading variant={"h2"}>{product.title}</MyHeading>
      </Link>

      <div className="relative h-full w-full rounded-3xl ring-primary transition-all duration-300 ease-out group-hover:ring">
        <Link to={"/order"}>
          <MyButton
            size={"icon"}
            className="absolute right-8 top-6 z-20 hover:size-[15%]"
            onClick={() => addOrderProduct(product.id)}
          >
            <ShoppingCart className="stroke-white stroke-[2px]" />
          </MyButton>
        </Link>
        <Link to={productLink} className="group/card">
          <Star className="absolute -z-10 h-full w-full -rotate-[55deg] fill-zinc-100 stroke-orange-100 px-4" />
          <img
            src={product.image}
            alt="product"
            className="-rotate-[16deg] scale-x-[-1] transform px-8"
          />
          <MyHeading
            className="absolute bottom-6 left-8 z-10 rounded-lg border-2 border-zinc-600 bg-white p-1 transition-all duration-300 ease-out group-hover:border-primary group-hover/card:bg-primary group-hover/card:text-3xl group-hover/card:text-white"
            variant={"h4"}
          >
            {product.price}$
          </MyHeading>

          <div className="absolute bottom-0 top-0 -z-20 w-full rounded-3xl bg-zinc-50" />
        </Link>
      </div>
    </div>
  );
});

export default ProductCard;
