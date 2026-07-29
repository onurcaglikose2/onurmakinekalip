"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";
import { track } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  children: ReactNode;
};

export function TrackedLink({
  event,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      onClick={(eventObject) => {
        track(event);
        onClick?.(eventObject);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

type TrackedInternalLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    event: AnalyticsEvent;
    children: ReactNode;
  };

export function TrackedInternalLink({
  event,
  children,
  onClick,
  ...props
}: TrackedInternalLinkProps) {
  return (
    <Link
      prefetch={false}
      onClick={(eventObject) => {
        track(event);
        onClick?.(eventObject);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
