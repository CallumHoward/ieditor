import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { EditorPage } from "./pages/editor-page";

const StyledAppContainer = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

export const App: FunctionComponent = () => {
  return (
    <StyledAppContainer>
      <EditorPage />
    </StyledAppContainer>
  );
};
