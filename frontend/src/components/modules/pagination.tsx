import { cn } from "@/lib/cn";
import { ComponentPropsWithRef, forwardRef } from "react";
import MyButton from "../ui/button";

type Props = ComponentPropsWithRef<"div"> & {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
};

const Pagination = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, page, setPage, lastPage, ...otherProps } = props;
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-2", className)}
      {...otherProps}
    >
      =
      {lastPage !== 1
        ? Array.from({ length: lastPage ?? 0 }, (_, index) => index + 1).map(
            (number) => (
              <MyButton
                size={"icon"}
                variant={page === number ? "default" : "outline"}
                onClick={() => setPage(number)}
              >
                {number}
              </MyButton>
            ),
          )
        : null}
      =
    </div>
  );
});

export default Pagination;
