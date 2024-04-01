import Header from "../components/modules/header";
import Footer from "../components/modules/footer";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "@/validation/register.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MyHeading from "@/components/ui/heading";
import { MyInput } from "@/components/ui/input";
import MyButton from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "@/constants/app-keys.const";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/user.store";
import { RegisterBody } from "@/services/auth/auth.types";
import { authService } from "@/services/auth/auth.service";

function RegistrationPage() {
  const [setUser, setToken] = useUserStore((state) => [
    state.setUser,
    state.setToken,
  ]);

  const { mutate } = useMutation({
    mutationKey: [QUERY_KEYS.REGISTRATION],
    mutationFn: (body: RegisterBody) => authService.register(body),
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.jwt);
    },
    onError: (error: AxiosError | any) =>
      toast.error(error?.response?.data?.message),
  });

  const form = useForm<RegisterBody>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterBody> = (data) => {
    mutate(data);
  };
  return (
    <>
      <main className="h-svh w-full">
        <div className="flex h-full justify-center px-8 py-10">
          <div className="flex h-full w-full max-w-5xl flex-col justify-between ">
            <Header />
            <div className="flex justify-between">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" w-full max-w-lg space-y-8"
                >
                  <MyHeading variant={"h1"}>Registration</MyHeading>
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <MyInput
                            placeholder="Some first name..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <MyInput placeholder="Some last name..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default RegistrationPage;
