import Bar from "@/components/charts/bar";
import MyHeading from "@/components/ui/heading";
import { QUERY_KEYS } from "@/constants/app-keys.const";
import { cn } from "@/lib/cn";
import { orderService } from "@/services/order/order.service";
import { productService } from "@/services/product/product.service";
import { userService } from "@/services/user/order.service";
import { useQuery } from "@tanstack/react-query";
import { ComponentPropsWithRef, forwardRef } from "react";

type Props = ComponentPropsWithRef<"div">;

const StatsModule = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...otherProps } = props;

  const { data: orders } = useQuery({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: () => orderService.getAllOrders(1, 100),
  });

  const { data: users } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: () => userService.getAllUsers(1, 100),
  });

  const { data: products } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: () => productService.getAllProducts(1, 100),
  });

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-20", className)}
      {...otherProps}
    >
      <MyHeading variant={"h3"} className="text-center">
        Stats
      </MyHeading>
      <div className="flex flex-col gap-4">
        <MyHeading variant={"h5"}>All users: {users?.data.length}</MyHeading>
        <MyHeading variant={"h5"}>
          All products: {products?.data.length}
        </MyHeading>
        <MyHeading variant={"h5"}>All orders: {orders?.data.length}</MyHeading>
        <MyHeading variant={"h5"}>
          Order delivered:{" "}
          {orders?.data.reduce(
            (count, order) =>
              order.delivery.status === "DELIVERED" ? count + 1 : count,
            0,
          )}
        </MyHeading>

        <MyHeading variant={"h5"}>
          Order delivery in progress:{" "}
          {orders?.data.reduce(
            (count, order) =>
              order.delivery.status === "INPROGRESS" ? count + 1 : count,
            0,
          )}
        </MyHeading>
        <MyHeading variant={"h5"}>
          Order payment accepted:{" "}
          {orders?.data.reduce(
            (count, order) =>
              order.payment.status === "ACCEPTED" ? count + 1 : count,
            0,
          )}
        </MyHeading>
        <MyHeading variant={"h5"}>
          Order payment in progress:{" "}
          {orders?.data.reduce(
            (count, order) =>
              order.payment.status === "INPROGRESS" ? count + 1 : count,
            0,
          )}
        </MyHeading>
        <MyHeading variant={"h5"}>
          Order payment rejected:{" "}
          {orders?.data.reduce(
            (count, order) =>
              order.payment.status === "REJECTED" ? count + 1 : count,
            0,
          )}
        </MyHeading>
      </div>
      <div className="mx-auto h-[550px] w-[1000px] space-y-8 rounded-md border px-4 pb-24 pt-4 shadow">
        <MyHeading variant={"h4"} className="text-center">
          Orders
        </MyHeading>
        <Bar
          barDataKey="orders"
          xDataKey="date"
          data={Object.entries(
            (orders?.data || []).reduce(
              (acc, order) => {
                const date = new Date(order.created_at).toLocaleDateString();
                acc[date] = (acc[date] || 0) + 1;
                return acc;
              },
              {} as { [date: string]: number },
            ),
          ).map(([date, orders]) => ({
            date,
            orders,
          }))}
        />
      </div>
      <div className="mx-auto h-[550px] w-[1000px] space-y-8 rounded-md border px-4 pb-24 pt-4 shadow">
        <MyHeading variant={"h4"} className="text-center">
          Products
        </MyHeading>
        <Bar
          barDataKey="count"
          xDataKey="product"
          data={Object.entries(
            (orders?.data || []).reduce<{ [productName: string]: number }>(
              (acc, order) => {
                products?.data.forEach((product) => {
                  const productName = product.title.split(" ").join("\n");
                  acc[productName] = acc[productName] || 0;
                });
                order.products.forEach((product) => {
                  const productName = product.title.split(" ").join("\n");
                  acc[productName] = (acc[productName] || 0) + product.count;
                });
                return acc;
              },
              {},
            ),
          ).map(([product, count]) => ({
            product,
            count,
          }))}
        />
      </div>
    </div>
  );
});

export default StatsModule;
