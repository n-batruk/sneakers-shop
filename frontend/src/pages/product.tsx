import { QUERY_KEYS } from "../constants/app-keys.const";
import { productService } from "../services/product/product.service";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/modules/header";
import Footer from "../components/modules/footer";
import { Link, useParams } from "react-router-dom";
import MyHeading from "@/components/ui/heading";
import MyButton from "@/components/ui/button";
import { Star } from "lucide-react";
import { useOrderStore } from "@/store/order.store";

function ProductPage() {
  let { productId } = useParams();

  const { isSuccess, data } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT],
    queryFn: () => productService.findProductById(productId ?? ""),
  });

  const [addOrderProduct] = useOrderStore((state) => [state.addOrderProduct]);
  return (
    <>
      <main className="h-svh w-full">
        <div className="flex justify-center px-8 py-10">
          <div className="w-full max-w-5xl space-y-24">
            <Header />
            {isSuccess ? (
              <div className="flex flex-col gap-20 px-24">
                <div className="flex flex-col gap-8">
                  <MyHeading variant={"h2"} className="text-center">
                    {data.title}
                  </MyHeading>
                  <MyHeading
                    variant={"h5"}
                    className="text-wrap text-center text-zinc-800"
                  >
                    {data.description}
                  </MyHeading>
                </div>

                <div className="relative h-full w-full rounded-3xl px-40">
                  <Star
                    className={`absolute -z-10 h-full w-full -rotate-[55deg] fill-zinc-100 stroke-orange-100 px-4`}
                  />
                  <img
                    src={data.image}
                    alt="product"
                    className={`-rotate-[15deg] transform px-8`}
                  />
                </div>
                <div className="grid grid-cols-5">
                  {[
                    "rotate-[40deg]",
                    "rotate-[20deg]",
                    "rotate-[0deg]",
                    "rotate-[15deg]",
                    "rotate-[30deg]",
                  ].map((val) => (
                    <div className="relative h-full w-full rounded-3xl">
                      <Star
                        className={`absolute -z-10 h-full w-full -rotate-[55deg] fill-zinc-100 stroke-orange-100 px-4`}
                      />
                      <img
                        src={data.image}
                        alt="product"
                        className={`${val} transform px-8`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Link to={"/order"}>
                    <MyButton
                      className="h-20 rounded-md px-24 text-3xl"
                      onClick={() => addOrderProduct(data.id)}
                    >
                      Замовити
                    </MyButton>
                  </Link>
                </div>
              </div>
            ) : (
              "Loading"
            )}

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductPage;
