import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#34AA49] text-white hover:bg-[#268537] shadow-none active:scale-[0.99]",
        brass:
          "bg-[#B38E5D] text-white hover:bg-[#8C6D46] shadow-none active:scale-[0.99]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-none",
        outline:
          "border border-stone-300 bg-transparent hover:bg-stone-100/60 text-stone-900 active:scale-[0.99]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-stone-200/60",
        ghost: "hover:bg-stone-100 text-stone-900",
        link: "text-[#34AA49] underline-offset-4 hover:underline lowercase tracking-normal",
        glass:
          "bg-white/70 backdrop-blur-md border border-white/40 text-stone-900 hover:bg-white/90 active:scale-[0.99]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-[11px]",
        lg: "h-13 px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        suppressHydrationWarning
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
