import React, { FunctionComponent } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { YProvider } from "./contexts/yjs-context";
import styled from "styled-components";
import { EditorPage } from "./pages/editor-page";
import { ListPage } from "./pages/list-page";
import { LoginPage } from "./pages/login-page";
import { UserProvider } from "./contexts/user-context";

const StyledAppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const App: FunctionComponent = () => {
  return (
    <YProvider>
      <UserProvider>
        <StyledAppContainer>
          <Router>
            <Switch>
              <Route path={"/edit"}><EditorPage /></Route>
              <Route path={"/list"}><ListPage /></Route>
              <Route path={"/"} component={LoginPage} />
            </Switch>
          </Router>
        </StyledAppContainer>
      </UserProvider>
    </YProvider>
  );
};
