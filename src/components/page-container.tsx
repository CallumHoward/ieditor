import React, { FunctionComponent } from "react";
import styled from "styled-components";

const PageContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const NavBar = styled.header`
  width: 100%;
  height: 6vh;
  padding: 0 1rem;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #ffffff;
`;

const PageBody = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const PageContainer: FunctionComponent = ({ children }) => {
  return (
    <PageContainerWrapper>
      <NavBar>
        <button>Back</button>
      </NavBar>
      <PageBody>{children}</PageBody>
    </PageContainerWrapper>
  );
};

export default PageContainer;
