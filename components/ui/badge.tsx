import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "danger" | "gold" | "secondary";
}

const variantClasses: Record<string, string> = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-red-100 text-red-700",
  gold: "bg-gold-100 text-gold-800",
  secondary: "bg-slate-100 text-slate-700",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
