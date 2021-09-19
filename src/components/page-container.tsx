import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { NavBar } from "./nav-bar";
import { NAVBAR_HEIGHT } from "./nav-bar-styled";

const PageContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PageBody = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - ${NAVBAR_HEIGHT});
`;

export const PageContainer: FunctionComponent = ({ children }) => {
  return (
    <PageContainerWrapper>
      <NavBar />
      <PageBody>{children}</PageBody>
    </PageContainerWrapper>
  );
};
