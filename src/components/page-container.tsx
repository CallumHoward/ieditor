import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { ArrowLeftSvg } from "../assets/arrow-left-svg";
import { EditSvg } from "../assets/edit-svg";

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
  box-shadow: 0 0px 7px rgba(66, 66, 66, 0.08), 0 3px 4px rgba(66, 66, 66, 0.1);
`;

const PageBody = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const StyledNavButton = styled.div`
  color: #6559ff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const StyledButtonContainer = styled.div`
  width: 2rem;
  display: inline-flex;
  align-items: center;
`;

const StyledH1 = styled.h1`
  align-items: center;
  text-align: center;
  flex-grow: 1;
  font-size: 1rem;
  font-weight: 400;
  color: #6559ff;
  line-height: 1.5rem;
`;

const PageContainer: FunctionComponent = ({ children }) => {
  const [editing, setEditing] = useState<boolean>(false);
  return (
    <PageContainerWrapper>
      <NavBar>
        <StyledButtonContainer>
          {!editing && (
            <StyledNavButton>
              <ArrowLeftSvg />
            </StyledNavButton>
          )}
        </StyledButtonContainer>
        <StyledH1>{editing ? "Edit Template" : "Conduct Inspection"}</StyledH1>
        <StyledButtonContainer style={{ flexDirection: "row-reverse" }}>
          <StyledNavButton
            onClick={() => {
              setEditing(!editing);
            }}
          >
            {editing ? "Done" : <EditSvg />}
          </StyledNavButton>
        </StyledButtonContainer>
      </NavBar>
      <PageBody>{children}</PageBody>
    </PageContainerWrapper>
  );
};

export default PageContainer;
