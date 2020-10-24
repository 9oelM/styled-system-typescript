import { CSSProperties } from "styled-components";

export type Identity<Self = any> = (x: Self) => Self;

export function identity<Self>(x: Self): Self {
  return x;
}

export type WithSpecifiedStyles<
  Styles extends keyof CSSProperties = keyof CSSProperties
> = Identity<{ [K in Styles]?: string | number }>;

export type PickStyles<Styles extends keyof CSSProperties = keyof CSSProperties> = {
  [K in Styles]?: string | number;
};

export type GetStylesFrom<
  WithSpecifiedStyleFn extends WithSpecifiedStyles
> = ReturnType<WithSpecifiedStyleFn>;
