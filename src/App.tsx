import React, { FunctionComponent, useEffect } from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { YProvider } from "./contexts/yjs-context";
import styled from "styled-components";
import { EditorPage } from "./pages/editor-page";
import { ListPage } from "./pages/list-page";
import { LoginPage } from "./pages/login-page";
import { UserProvider } from "./contexts/user-context";
import smoothScroll from "smoothscroll-polyfill";

const StyledAppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const App: FunctionComponent = () => {
  useEffect(() => {
    smoothScroll.polyfill();
  }, []);

  return (
    <YProvider>
      <UserProvider>
        <StyledAppContainer>
          <Router>
            <Switch>
              <Route path={"/edit"} component={EditorPage} />
              <Route path={"/list"} component={ListPage} />
              <Route path={"/"} component={EditorPage} />
            </Switch>
          </Router>
        </StyledAppContainer>
      </UserProvider>
    </YProvider>
  );
};
