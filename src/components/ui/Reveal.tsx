"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  variant?: "rise" | "line";
  id?: string;
  style?: CSSProperties;
};

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "rise",
  id,
  style,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <Tag
      id={id}
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}
      className={cn(variant === "line" ? "reveal-line" : "reveal", inView && "is-in", className)}
    >
      {children}
    </Tag>
  );
}
