import Header from "../components/modules/header";
import Footer from "../components/modules/footer";
import { useState } from "react";
import MyButton from "@/components/ui/button";
import UsersModule from "@/components/modules/admin/users-module";
import OrdersModule from "@/components/modules/admin/orders-module";
import ProductsModule from "@/components/modules/admin/products-module";
import StatsModule from "@/components/modules/admin/stats-module";

function AdminPage() {
  const [page, setPage] = useState<"users" | "orders" | "products" | "stats">(
    "orders",
  );

  return (
    <>
      <main className="h-svh w-full">
        <div className="flex justify-center px-8 py-10">
          <div className="w-full max-w-5xl space-y-16">
            <Header />
            <div className="flex justify-center gap-4">
              <MyButton
                variant={page === "orders" ? "default" : "outline"}
                onClick={() => setPage("orders")}
              >
                Orders
              </MyButton>
              <MyButton
                variant={page === "products" ? "default" : "outline"}
                onClick={() => setPage("products")}
              >
                Products
              </MyButton>
              <MyButton
                variant={page === "users" ? "default" : "outline"}
                onClick={() => setPage("users")}
              >
                Users
              </MyButton>
              <MyButton
                variant={page === "stats" ? "default" : "outline"}
                onClick={() => setPage("stats")}
              >
                Stats
              </MyButton>
            </div>
            {page === "users" ? <UsersModule /> : null}
            {page === "orders" ? <OrdersModule /> : null}
            {page === "products" ? <ProductsModule /> : null}
            {page === "stats" ? <StatsModule /> : null}

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminPage;
