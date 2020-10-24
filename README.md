# @9oelm/styled-system-typescript
Typescript-only styled system solution

```
npm i @9oelm/styled-system-typescript

yarn add @9oelm/styled-system-typescript
```

## Example

```ts
import styled from 'styled-components'
import { WithSpecifiedStyles } from '@9oelm/styled-system-typescript'
 
const Box = styled.div(
  {
    backgroundColor: "#333333",
    height: 20,
  },
  (styles: PickStyles<"margin" | "height" | "width">) => styles
)

const MyComponent = () => {
  <Box margin={10} height={60} width={10}>
    Hi
  </Box>
}
```

## Rationale
Sometimes you want to dynamically adjust styles of a component made from `styled-component` by injecting custom styles. If you are using typescript, this would help you achieve that without any additional javascript. It is only done with typescript.

## API

`Identity` and `identity`: 
```typescript
type Identity<Self = any> = (x: Self) => Self;

const withSpecifiedStyles: <Self>() => Identity<Self> = () => (x) => x;
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

