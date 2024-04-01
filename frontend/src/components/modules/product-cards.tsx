import { ComponentPropsWithRef, forwardRef } from "react";
import ProductCard from "../cards/product-card";
import { cn } from "@/lib/cn";
import { useProductStore } from "@/store/products.store";

type Props = ComponentPropsWithRef<"div"> & {};
const ProductCards = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...otherProps } = props;
  const [products] = useProductStore((state) => [state.products]);
  return (
    <div
      ref={ref}
      className={cn("grid grid-cols-1 gap-16 md:grid-cols-2", className)}
      {...otherProps}
    >
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
});

export default ProductCards;
