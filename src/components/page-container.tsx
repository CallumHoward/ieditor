import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { NavBar } from "./nav-bar";

const PageContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PageBody = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

export const PageContainer: FunctionComponent = ({ children }) => {
  return (
    <PageContainerWrapper>
      <NavBar />
      <PageBody>{children}</PageBody>
    </PageContainerWrapper>
  );
};
