import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { EditorPage } from "./pages/editor-page";

const StyledAppContainer = styled.div`
  padding: 1rem;
`;

export const App: FunctionComponent = () => {
  return (
    <StyledAppContainer>
      <EditorPage />
    </StyledAppContainer>
  );
};
