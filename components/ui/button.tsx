"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-gold-500 hover:bg-gold-600 text-white focus:ring-gold-400",
        outline: "border-2 border-gold-500 text-gold-700 hover:bg-gold-50 focus:ring-gold-400",
        ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
        destructive: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400",
        secondary: "bg-slate-800 hover:bg-slate-700 text-white focus:ring-slate-600",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
