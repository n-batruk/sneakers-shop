import { QUERY_KEYS } from "../constants/app-keys.const";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/modules/header";
import Footer from "../components/modules/footer";
import MyHeading from "@/components/ui/heading";
import { orderService } from "@/services/order/order.service";
import { userService } from "@/services/user/order.service";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function AdminPage() {
  const { data: orders } = useQuery({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: () => orderService.getAllOrders(),
  });
  const { data: users } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: () => userService.getAllUsers(),
  });
  return (
    <>
      <main className="h-svh w-full">
        <div className="flex justify-center px-8 py-10">
          <div className="w-full max-w-5xl space-y-20">
            <Header />
            <MyHeading variant={"h3"} className="text-center">
              All Users
            </MyHeading>
            <Table className="mx-auto max-w-4xl rounded-3xl">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>First name</TableHead>
                  <TableHead>Last name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user, ind) => (
                  <TableRow>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{user.account_role}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order, ind) => (
                  <TableRow>
                    <TableCell>{ind}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminPage;
