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
import { userService } from "@/services/user/order.service";
import { useQuery } from "@tanstack/react-query";
import { ComponentPropsWithRef, forwardRef, useState } from "react";

type Props = ComponentPropsWithRef<"div">;

const UsersModule = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...otherProps } = props;
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.USERS, page],
    queryFn: () => userService.getAllUsers(page, 5),
  });
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-8", className)}
      {...otherProps}
    >
      <MyHeading variant={"h3"} className="text-center">
        All Users
      </MyHeading>
      <Table className="mx-auto max-w-4xl rounded-3xl">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((user, ind) => (
            <TableRow>
              <TableCell>
                {ind + 1 + data.meta.perPage * (data.meta.currentPage - 1)}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
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

export default UsersModule;
