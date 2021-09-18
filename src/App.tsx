import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { EditorPage } from "./pages/editor-page";

const StyledAppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  background: lightGrey;
  padding: 30px;
`;

export const App: FunctionComponent = () => {
  return (
    <StyledAppContainer>
      <EditorPage />
    </StyledAppContainer>
  );
};
