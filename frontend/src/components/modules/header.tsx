import { cn } from "@/lib/cn";
import { ComponentPropsWithRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import MyHeading from "../ui/heading";
import MyButton from "../ui/button";
import { useUserStore } from "@/store/user.store";
import { authService } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/app-keys.const";

type Props = ComponentPropsWithRef<"div">;

const Header = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...otherProps } = props;
  const [token, user, deleteUser, deleteToken] = useUserStore((state) => [
    state.token,
    state.user,
    state.deleteUser,
    state.deleteToken,
  ]);
  const { mutate } = useMutation({
    mutationKey: [QUERY_KEYS.LOGOUT],
    mutationFn: () => authService.logOut(),
    onSuccess: () => {
      deleteUser();
      deleteToken();
    },
    onError: (error: AxiosError | any) =>
      toast.error(error?.response?.data?.message),
  });
  return (
    <div
      ref={ref}
      className={cn("flex justify-between", className)}
      {...otherProps}
    >
      <Link to={"/"} className="flex w-min flex-col items-end gap-[0.1rem]">
        <MyHeading variant={"h1"} className="font-decor text-primary">
          MySneak
        </MyHeading>
        <MyHeading
          variant={"h6"}
          className="font-semibold uppercase md:text-xs"
        >
          New York sneakers
        </MyHeading>
      </Link>
      <div className="flex gap-2">
        {token ? (
          <MyButton
            variant={"ghost"}
            size={"lg"}
            className="text-lg"
            onClick={() => mutate()}
          >
            Вийти
          </MyButton>
        ) : (
          <Link to={"/login"}>
            <MyButton variant={"ghost"} size={"lg"} className="text-lg">
              Увійти
            </MyButton>
          </Link>
        )}
        {user?.account_role !== "ADMIN" ? (
          <Link to={"/order"}>
            <MyButton variant={"default"} size={"lg"} className="text-lg">
              Замовити
            </MyButton>
          </Link>
        ) : null}
      </div>
    </div>
  );
});

export default Header;
