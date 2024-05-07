import Header from "../components/modules/header";
import Footer from "../components/modules/footer";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginBody } from "@/services/auth/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validation/login.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MyInput } from "@/components/ui/input";

import MyButton from "@/components/ui/button";
import MyHeading from "@/components/ui/heading";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth.service";
import { QUERY_KEYS } from "@/constants/app-keys.const";
import { toast } from "sonner";
import { AxiosError } from "axios";

function LoginPage() {
  const [setUser, setToken] = useUserStore((state) => [
    state.setUser,
    state.setToken,
  ]);

  const { mutate } = useMutation({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: (body: LoginBody) => authService.login(body),
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.jwt);
    },
    onError: (error: AxiosError | any) =>
      toast.error(error?.response?.data?.message),
  });

  const form = useForm<LoginBody>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginBody> = (data) => {
    mutate(data);
  };
  return (
    <>
      <main className="h-svh w-full text-base">
        <div className="flex h-full justify-center px-8 py-10">
          <div className="flex h-full w-full max-w-5xl flex-col justify-between ">
            <Header />
            <div className="flex justify-between">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" w-full max-w-lg space-y-8"
                >
                  <MyHeading variant={"h1"}>Login</MyHeading>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <MyInput placeholder="Some email..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <MyInput
                            type="password"
                            placeholder="Some password..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <MyButton size={"lg"} type="submit">
                    Submit
                  </MyButton>
                </form>
              </Form>

              <Star className="my-auto h-96 w-96 -rotate-[55deg] fill-primary stroke-primary px-4 opacity-15" />
            </div>
            <div>
              <MyHeading variant={"h6"}>Don't have account?</MyHeading>
              <Link to={"/registration"}>
                <MyHeading
                  variant={"h6"}
                  className="italic text-blue-600 underline"
                >
                  Create a new one!
                </MyHeading>
              </Link>
            </div>

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
