import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34AA49] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#34AA49] hover:bg-[#268537] text-white shadow-md shadow-[#34AA49]/25 hover:shadow-lg hover:shadow-[#34AA49]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-emerald-400/30",
        brass:
          "bg-[#34AA49] hover:bg-[#268537] text-white shadow-md shadow-[#34AA49]/25 hover:shadow-lg hover:shadow-[#34AA49]/35 hover:-translate-y-0.5 active:scale-[0.98] border border-emerald-400/30",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
        outline:
          "border border-white/20 bg-slate-900/90 text-white hover:bg-slate-800 hover:border-white/40 hover:-translate-y-0.5 active:scale-[0.98] shadow-sm",
        secondary:
          "bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white border border-white/10 hover:-translate-y-0.5 shadow-sm",
        ghost:
          "text-slate-300 hover:text-white hover:bg-white/10 transition-colors",
        link:
          "text-[#34AA49] underline-offset-4 hover:underline lowercase font-normal",
        glass:
          "bg-white/10 backdrop-blur-xl border border-white/15 text-white hover:bg-white/20 hover:-translate-y-0.5 shadow-sm",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-[11px]",
        lg: "h-13 px-8 text-sm",
        icon: "h-10 w-10 p-0 rounded-full",
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
