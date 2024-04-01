import { QUERY_KEYS } from "../constants/app-keys.const";
import { productService } from "../services/product/product.service";
import { useQuery } from "@tanstack/react-query";
import ProductCards from "../components/modules/product-cards";
import Header from "../components/modules/header";
import Footer from "../components/modules/footer";
import { useEffect } from "react";
import { useProductStore } from "@/store/products.store";

function MainPage() {
  const [products, setProducts] = useProductStore((state) => [
    state.products,
    state.setProducts,
  ]);

  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: () => productService.getAllProducts(),
    enabled: false,
  });

  useEffect(() => {
    if (!products.length) {
      refetch();
    }
  }, []);
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  return (
    <>
      <main className="h-svh w-full">
        <div className="flex justify-center px-8 py-10">
          <div className="w-full max-w-5xl space-y-24">
            <Header />
            <ProductCards />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
