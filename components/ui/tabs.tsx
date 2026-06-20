"use client";
import { cn } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

interface TabsContextValue {
  value: string;
  onChange: (v: string) => void;
}
const TabsContext = createContext<TabsContextValue>({ value: "", onChange: () => {} });

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
  onValueChange?: (v: string) => void;
}
export function Tabs({ defaultValue, children, className, onValueChange }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  const onChange = (v: string) => {
    setValue(v);
    onValueChange?.(v);
  };
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center bg-gray-100 rounded-xl p-1 gap-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext);
  const active = ctx.value === value;
  return (
    <button
      onClick={() => ctx.onChange(value)}
      className={cn(
        "px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200",
        active
          ? "bg-white text-gold-700 shadow-sm"
          : "text-gray-500 hover:text-gray-800"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div className={cn("mt-4", className)}>{children}</div>;
}
