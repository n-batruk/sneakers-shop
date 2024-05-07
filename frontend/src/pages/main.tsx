import { QUERY_KEYS } from "../constants/app-keys.const";
import { productService } from "../services/product/product.service";
import { useQuery } from "@tanstack/react-query";
import ProductCards from "../components/modules/product-cards";
import Header from "../components/modules/header";
import Footer from "../components/modules/footer";

function MainPage() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 0],
    queryFn: () => productService.getAllProducts(0, 100),
    enabled: true,
  });

  return (
    <>
      <main className="h-svh w-full">
        <div className="flex justify-center px-8 py-10">
          <div className="w-full max-w-5xl space-y-24">
            <Header />
            <ProductCards products={data?.data} />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
