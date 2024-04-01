import { cn } from "@/lib/cn";
import { ComponentPropsWithRef, forwardRef } from "react";
import MyHeading from "../ui/heading";

type Props = ComponentPropsWithRef<"div">;

const Footer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <div
      ref={ref}
      className={cn("flex justify-center rounded-3xl p-2", className)}
      {...otherProps}
    >
      <MyHeading variant={"h5"}>@2024 MySneak</MyHeading>
    </div>
  );
});

export default Footer;
