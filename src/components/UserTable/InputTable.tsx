import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/utils/cn";
import { LoaderCircle } from "lucide-react";

export interface InputTableProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
  isValidating?: boolean;
}

const InputTable = React.forwardRef<HTMLInputElement, InputTableProps>(
  ({ className, type = "text", error, isValidating, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <Input
          type={type}
          className={cn(
            "rounded-none shadow-none border-r-0 border-l-0 border-t-0 border-b-0 bg-transparent text-sm focus:ring-0  focus-visible:border-b-2 focus-visible:ring-0 focus-visible:border-b-blue-400 hover:cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        />

        {isValidating && (
          <LoaderCircle className="absolute right-0 animate-spin transition-all duration-300" />
        )}

        {error && (
          <div className="fixed z-[999999]  bg-red-400 p-1.5 rounded-sm">
            <p className="text-xs text-destructive-foreground">{error}</p>
          </div>
        )}
      </div>
    );
  }
);

InputTable.displayName = "InputTable";

export default InputTable;
