import React, { FunctionComponent, useState } from "React";
import { ArrowLeftSvg } from "../assets/arrow-left-svg";
import { EditSvg } from "../assets/edit-svg";
import { NavBarContainer, StyledButtonContainer, StyledH1, StyledNavButton } from "./nav-bar-styled";

export const NavBar: FunctionComponent = () => {
  const [editing, setEditing] = useState<boolean>(false);
  return (
    <NavBarContainer>
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
    </NavBarContainer>
  );
};
