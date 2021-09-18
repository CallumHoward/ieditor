import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { QuestionsList } from "../components/questions-list";

const PageContainer = styled.div``;

const NavBar = styled.header`
  width: 100%;
  min-height: 6vh;
  padding: 0 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
`;

export const EditorPage: FunctionComponent = () => {
  return (
    <PageContainer>
      <NavBar>
        <button>Back</button>
      </NavBar>
      <QuestionsList />
    </PageContainer>
  );
};
