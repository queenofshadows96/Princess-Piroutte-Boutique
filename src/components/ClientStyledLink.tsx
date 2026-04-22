"use client";

import Link from "next/link";
import React from "react";

interface ClientStyledLinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  hoverColor?: string;
  normalColor?: string;
}

export default function ClientStyledLink({
  href,
  className,
  style,
  children,
  hoverColor,
  normalColor,
}: ClientStyledLinkProps) {
  const [bgColor, setBgColor] = React.useState<string | undefined>(
    style?.backgroundColor as string
  );

  return (
    <Link
      href={href}
      className={className}
      style={{
        ...style,
        backgroundColor: bgColor,
      }}
      onMouseEnter={() => {
        if (hoverColor) setBgColor(hoverColor);
      }}
      onMouseLeave={() => {
        if (normalColor) setBgColor(normalColor);
      }}
    >
      {children}
    </Link>
  );
}
