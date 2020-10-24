import React from "react";
import styled from 'styled-components';
import { WithSpecifiedStyles, identity, GetStylesFrom, Identity, PickStyles } from '.';

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
      <TestButton3>Hi3</TestButton3>
    </>
  );
}
