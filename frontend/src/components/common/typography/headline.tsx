import { cn } from "@/utils/cn";

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("font-bold text-4xl font-sans text-black", className)}>
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("font-bold text-3xl font-sans text-black", className)}>
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn("font-medium text-2xl font-sans text-slate-500", className)}
    >
      {children}
    </h3>
  );
}
