import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { NavBar } from "./nav-bar";
import { NAVBAR_HEIGHT } from "./nav-bar-styled";

export const PageContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const PageBody = styled.div`
  padding: 0 1rem 0;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - ${NAVBAR_HEIGHT});
  position: relative;
`;

type Props = {
  editing: boolean;
  setEditing: (value: boolean) => void;
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
  openDrawer: () => void;
};

export const PageContainer: FunctionComponent<Props> = ({
  editing,
  setEditing,
  focusMode,
  setFocusMode,
  openDrawer,
  children,
}) => {
  return (
    <PageContainerWrapper>
      <NavBar
        editing={editing}
        setEditing={setEditing}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        openDrawer={openDrawer}
      />
      <PageBody>{children}</PageBody>
    </PageContainerWrapper>
  );
};
