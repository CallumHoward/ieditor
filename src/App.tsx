import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { ScrollListTest } from "./pages/scroll-list-test";

const StyledAppContainer = styled.div`
  padding: 1rem;
`;

export const App: FunctionComponent = () => {
  return (
    <StyledAppContainer>
      {/* <EditorPage /> */}
      <ScrollListTest />
    </StyledAppContainer>
  );
};
