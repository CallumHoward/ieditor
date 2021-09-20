import React, { FunctionComponent } from "React";
import { ArrowLeftSvg } from "../assets/arrow-left-svg";
import { EditSvg } from "../assets/edit-svg";
import { UndoSvg } from "../assets/undo-svg";
import { RedoSvg } from "../assets/redo-svg";
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
      {editing ? (
        <>
          <StyledButtonContainer>
            <StyledNavButton>
              <UndoSvg />
            </StyledNavButton>
          </StyledButtonContainer>
          <StyledButtonContainer>
            <StyledNavButton>
              <RedoSvg />
            </StyledNavButton>
          </StyledButtonContainer>
        </>
      ) : (
        <StyledButtonContainer>
          <StyledNavButton>
            <ArrowLeftSvg />
          </StyledNavButton>
        </StyledButtonContainer>
      )}
      <StyledH1>{editing ? "Edit Template" : "Conduct Inspection"}</StyledH1>
      <StyledButtonContainer style={{ flexDirection: "row-reverse" }}>
        <StyledNavButton
          onClick={() => {
            setFocusMode(!focusMode);
          }}
        >
          {!editing && !focusMode && "Focus"}
        </StyledNavButton>
      </StyledButtonContainer>
      <StyledButtonContainer style={{ flexDirection: "row-reverse" }}>
        <StyledNavButton
          onClick={() => {
            setEditing(!editing && !focusMode);
            setFocusMode(false);
          }}
        >
          {editing || focusMode ? "Done" : <EditSvg />}
        </StyledNavButton>
      </StyledButtonContainer>
    </NavBarContainer>
  );
};
