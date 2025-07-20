import React from "react";
import { cn } from "../../lib/utils";

const variantMap = {
  heading1: { tag: "h1", className: "text-4xl font-bold" },
  heading2: { tag: "h2", className: "text-3xl font-bold" },
  heading3: { tag: "h3", className: "text-2xl font-bold" },
  subtitle1: { tag: "h4", className: "text-xl font-semibold" },
  subtitle2: { tag: "h5", className: "text-lg font-semibold" },
  subtitle3: { tag: "h6", className: "text-base font-semibold" },
  body1: { tag: "p", className: "text-base font-normal" },
  body2: { tag: "p", className: "text-sm font-normal" },
  body3: { tag: "p", className: "text-xs font-normal" },
  caption: { tag: "span", className: "text-xs font-medium" },
  muted: {
    tag: "span",
    className: "text-sm font-normal text-muted-foreground",
  },
};

type TypographyVariant = keyof typeof variantMap;

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  asChild?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  className,
  asChild,
  children,
  ...props
}) => {
  const { tag, className: variantClass } = variantMap[variant];
  const Component = asChild ? React.Fragment : (tag as any);
  const componentProps = asChild
    ? { ...props, className: cn(variantClass, className), children }
    : { ...props, className: cn(variantClass, className) };

  return asChild ? (
    <Component {...componentProps} />
  ) : (
    React.createElement(tag, componentProps, children)
  );
};
