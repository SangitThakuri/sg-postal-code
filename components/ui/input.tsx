import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  suffix?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, suffix, error, id, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900",
            "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400",
            "disabled:bg-gray-50 disabled:cursor-not-allowed",
            suffix && "pr-14",
            error && "border-red-400 focus:ring-red-400",
            className
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";

export { Input };
