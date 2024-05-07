import { ComponentPropsWithRef, forwardRef, useState } from "react";
import ProductCard from "../cards/product-card";
import { cn } from "@/lib/cn";
import { MyInput } from "../ui/input";
import { Product } from "@/types/product.type";

type Props = ComponentPropsWithRef<"div"> & {
  products: Product[] | undefined;
};
const ProductCards = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, products, ...otherProps } = props;
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <MyInput
          className="w-[300px]"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div
        ref={ref}
        className={cn("grid grid-cols-1 gap-16 md:grid-cols-2", className)}
        {...otherProps}
      >
        {products
          ?.filter((product) => product.title.includes(search))
          .map((product) => <ProductCard product={product} />)}
      </div>
    </div>
  );
});

export default ProductCards;
