/* eslint-disable react/jsx-no-undef */
import React, { FunctionComponent } from "react";
import { YProvider } from "./contexts/yjs-context";
import styled from "styled-components";
import { EditorPage } from "./pages/editor-page";
import { ListPage } from "./pages/list-page";

const StyledAppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const App: FunctionComponent = () => {
  return (
    <YProvider>
      <StyledAppContainer>
        {/* <EditorPage /> */}
        <ListPage />
      </StyledAppContainer>
    </YProvider>
  );
};
