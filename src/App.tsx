import React, { FunctionComponent, StrictMode } from "react";
import styled from "styled-components";
import { EditorPage } from "./pages/editor-page";

const StyledAppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  background: lightGrey;
  padding: 30px;
  height: 1000px;
`;

export const App: FunctionComponent = () => {
  return (
    <StrictMode>
      <StyledAppContainer>
        <EditorPage />
      </StyledAppContainer>
    </StrictMode>
  );
};
