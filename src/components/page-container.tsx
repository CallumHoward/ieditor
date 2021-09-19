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

type Props = {
  editing: boolean;
  setEditing: (value: boolean) => void;
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
};

export const PageContainer: FunctionComponent<Props> = ({
  editing,
  setEditing,
  focusMode,
  setFocusMode,
  children,
}) => {
  return (
    <PageContainerWrapper>
      <NavBar
        editing={editing}
        setEditing={setEditing}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
      />
      <PageBody>{children}</PageBody>
    </PageContainerWrapper>
  );
};
