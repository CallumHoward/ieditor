import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { EditorPage } from "./pages/editor-page";
import { ListPage } from "./pages/list-page";

const StyledAppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const App: FunctionComponent = () => {
  return (
    <StyledAppContainer>
      {/* <EditorPage /> */}
      <ListPage />
    </StyledAppContainer>
  );
};
