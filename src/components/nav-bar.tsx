import React, { FunctionComponent } from "React";
import { ArrowLeftSvg } from "../assets/arrow-left-svg";
import { EditSvg } from "../assets/edit-svg";
import {
  NavBarContainer,
  StyledButtonContainer,
  StyledH1,
  StyledNavButton,
} from "./nav-bar-styled";

type Props = {
  editing: boolean;
  setEditing: (value: boolean) => void;
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
};

export const NavBar: FunctionComponent<Props> = ({
  editing,
  setEditing,
  focusMode,
  setFocusMode,
}) => {
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
            setFocusMode(!focusMode);
          }}
        >
          {focusMode ? "Normal" : "Focus"}
        </StyledNavButton>
      </StyledButtonContainer>
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
