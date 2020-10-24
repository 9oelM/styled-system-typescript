# @9oelm/styled-system-typescript
Typescript-only styled system solution

## Rationale
Sometimes you want to dynamically adjust styles of a component made from `styled-component` by injecting custom styles. If you are using typescript, this would help you achieve that without any additional javascript. It is only done with typescript.

## API

`Identity` and `identity`: 
```typescript
type Identity<Self = any> = (x: Self) => Self;

function identity<Self>(x: Self): Self {
  return x;
}
```

`WithSpecifiedStyles`: 
```typescript
type WithSpecifiedStyles<
  Styles extends keyof CSSProperties = keyof CSSProperties
> = Identity<{ [K in Styles]?: string | number }>;
```

`PickStyles`:
```typescript
type PickStyles<Styles extends keyof CSSProperties = keyof CSSProperties> = {
  [K in Styles]?: string | number;
};
```

`GetStylesFrom`:
```typescript
type GetStylesFrom<
  WithSpecifiedStyleFn extends WithSpecifiedStyles
> = ReturnType<WithSpecifiedStyleFn>;
```

## Example

```ts
import React from "react";
import styled from 'styled-components';
import { WithSpecifiedStyles, identity, GetStylesFrom, Identity, PickStyles } from '@9oelm/styled-system/typescript';

const withMarginAndWidth: WithSpecifiedStyles<
  "margin" | "width" | "height"
> = identity;

const withBackground: WithSpecifiedStyles<"background"> = identity;

type BackgroundMarginWidth = GetStylesFrom<typeof withBackground> &
  GetStylesFrom<typeof withMarginAndWidth>;

type WithBackgroundMarginWidth = Identity<BackgroundMarginWidth>;

const withBackgroundMarginWidth: WithBackgroundMarginWidth = identity;

const TestButton = styled.button(
  {
    backgroundColor: "#b33fea",
    height: 20
  },
  withBackgroundMarginWidth
);

const TestButton2 = styled.button(
  {
    backgroundColor: "#b33fea",
    height: 20
  },
  (
    styles: GetStylesFrom<typeof withBackground> &
      GetStylesFrom<typeof withMarginAndWidth>
  ) => styles
);

const TestButton3 = styled.button(
  {
    backgroundColor: "#b33fea",
    height: 20
  },
  (styles: PickStyles<"margin" | "background" | "width">) => styles
);

export default function App() {
  return (
    <>
      <TestButton background="#b33fea" margin="3px" width="50px">
        Hi
      </TestButton>
      <TestButton2 background="#842414" margin="51px" width={100}>
        Hi2
      </TestButton2>
      <TestButton3 height={400}>
        Hi3
      </TestButton3>
    </>
  );
}
```