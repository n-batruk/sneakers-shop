import MyButton from "@/components/ui/button";
import MyHeading from "@/components/ui/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QUERY_KEYS } from "@/constants/app-keys.const";
import { cn } from "@/lib/cn";
import { orderService } from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";
import { ComponentPropsWithRef, forwardRef, useState } from "react";
import OrderDialog from "./order-dialog";

type Props = ComponentPropsWithRef<"div">;

const OrdersModule = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...otherProps } = props;
  const [page, setPage] = useState(1);

  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, page],
    queryFn: () => orderService.getAllOrders(page, 5),
  });

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-8", className)}
      {...otherProps}
    >
      <MyHeading variant={"h3"} className="text-center">
        All Orders
      </MyHeading>
      <Table className="mx-auto max-w-4xl rounded-3xl">
        <TableHeader>
          <TableRow>
            <TableHead className="">#</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((order, ind) => (
            <TableRow>
              <TableCell>
                {ind + 1 + data.meta.perPage * (data.meta.currentPage - 1)}
              </TableCell>
              <TableCell>{order.user.email}</TableCell>
              <TableCell>
                {order.products
                  .map(
                    (product) =>
                      `${product.count} ${product.title.split(" ")[0]}`,
                  )
                  .join(", ")}
              </TableCell>
              <TableCell>{order.payment.amount}$</TableCell>
              <TableCell>{order.delivery.status}</TableCell>
              <TableCell>{order.payment.status}</TableCell>
              <TableCell>
                {new Date(order.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <OrderDialog
                  refetch={refetch}
                  order={order}
                  number={
                    ind + 1 + data.meta.perPage * (data.meta.currentPage - 1)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center gap-4">
        {data?.meta.lastPage !== 1
          ? Array.from(
              { length: data?.meta.lastPage ?? 0 },
              (_, index) => index + 1,
            ).map((number) => (
              <MyButton
                size={"icon"}
                variant={page === number ? "default" : "outline"}
                onClick={() => setPage(number)}
              >
                {number}
              </MyButton>
            ))
          : null}
      </div>
    </div>
  );
});

export default OrdersModule;
