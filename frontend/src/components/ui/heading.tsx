import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const headerVariants = cva(
  "items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-bold tracking-wide md:text-5xl",
        h2: "scroll-m-20 text-3xl font-bold tracking-wide md:text-4xl ",
        h3: "scroll-m-20 text-2xl font-bold tracking-wide md:text-3xl ",
        h4: "scroll-m-20 text-xl font-bold tracking-wide md:text-2xl",
        h5: "scroll-m-20 text-lg font-semibold tracking-wide md:text-xl",
        h6: "scroll-m-20 text-base font-medium tracking-wide md:text-lg",
      },
    },
    defaultVariants: {
      variant: "h6",
    },
  }
);

export interface HeadingProps
  extends React.HTMLProps<HTMLHeadingElement>,
    VariantProps<typeof headerVariants> {}

const MyHeading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, ...props }, ref) => {
    switch (variant) {
      case "h1": {
        return (
          <h1
            className={cn("", headerVariants({ variant, className }))}
            ref={ref}
            {...props}
          />
        );
      }
      case "h2": {
        return (
          <h2
            className={cn(headerVariants({ variant, className }))}
            ref={ref}
            {...props}
          />
        );
      }
      case "h3": {
        return (
          <h3
            className={cn(headerVariants({ variant, className }))}
            ref={ref}
            {...props}
          />
        );
      }
      case "h4": {
        return (
          <h4
            className={cn(headerVariants({ variant, className }))}
            ref={ref}
            {...props}
          />
        );
      }
      case "h5": {
        return (
          <h5
            className={cn(headerVariants({ variant, className }))}
            ref={ref}
            {...props}
          />
        );
      }
      case "h6": {
        return (
          <h6
            className={cn(headerVariants({ variant, className }))}
            ref={ref}
            {...props}
          />
        );
      }
    }
  }
);
MyHeading.displayName = "heading";
export default MyHeading;
