import { QUERY_KEYS } from "../constants/app-keys.const";
import { productService } from "../services/product/product.service";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/modules/header";
import Footer from "../components/modules/footer";
import { Link, useParams } from "react-router-dom";
import MyHeading from "@/components/ui/heading";
import MyButton from "@/components/ui/button";
import { useOrderStore } from "@/store/order.store";

function ProductPage() {
  const { productId } = useParams();

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
