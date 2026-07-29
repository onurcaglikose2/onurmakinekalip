import Link, { type LinkProps } from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "light";
    arrow?: boolean;
  };

export function ButtonLink({
  className,
  variant = "primary",
  arrow = false,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      prefetch={false}
      className={cn(
        "button-link",
        variant === "primary" && "button-primary",
        variant === "secondary" && "button-secondary",
        variant === "ghost" && "button-ghost",
        variant === "light" && "button-light",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {arrow ? <ArrowUpRight aria-hidden="true" size={17} /> : null}
    </Link>
  );
}
