import React, { FunctionComponent } from "React";
import { ArrowLeftSvg } from "../assets/arrow-left-svg";
import { MoreSvg } from "../assets/more-svg";
import { UndoSvg } from "../assets/undo-svg";
import { RedoSvg } from "../assets/redo-svg";
import {
  NavBarContainer,
  Spacer,
  StyledButtonContainer,
  StyledH1,
  StyledNavButton,
} from "./nav-bar-styled";
import { useYProvider } from "../contexts/yjs-context";
import { Link } from "react-router-dom";
import { FlashOffSvg } from "../assets/flash-off";
import { FlashOnSvg } from "../assets/flash-on";
import { AvatarStack } from "./avatar-stack";

type Props = {
  editing: boolean;
  setEditing: (value: boolean) => void;
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
  openDrawer: () => void;
  setCurrentIndex: (newIndex: number) => void;
};

export const NavBar: FunctionComponent<Props> = ({
  editing,
  setEditing,
  focusMode,
  setFocusMode,
  openDrawer,
  setCurrentIndex,
}) => {
  const { undoManager } = useYProvider();
  return (
    <NavBarContainer>
      <StyledH1
        style={{ position: "absolute", zIndex: -1, paddingTop: "0.125rem" }}
      >
        {editing ? "Edit Template" : "Conduct"}
      </StyledH1>
      {editing ? (
        <>
          <StyledButtonContainer>
            <StyledNavButton
              onClick={() => {
                undoManager.undo();
              }}
            >
              <UndoSvg />
            </StyledNavButton>
          </StyledButtonContainer>
          <StyledButtonContainer>
            <StyledNavButton
              onClick={() => {
                undoManager.redo();
              }}
            >
              <RedoSvg />
            </StyledNavButton>
          </StyledButtonContainer>
        </>
      ) : (
        <StyledButtonContainer>
          <StyledNavButton>
            <Link to={"/"} style={{ height: "16px" }}>
              <ArrowLeftSvg />
            </Link>
          </StyledNavButton>
        </StyledButtonContainer>
      )}
      <Spacer />
      <AvatarStack openDrawer={openDrawer} setCurrentIndex={setCurrentIndex} />
      {/* {!editing && ( */}
      {/*   <StyledButtonContainer style={{ flexDirection: "row-reverse" }}> */}
      {/*     <StyledNavButton */}
      {/*       onClick={() => { */}
      {/*         setFocusMode(!focusMode); */}
      {/*       }} */}
      {/*     > */}
      {/*       {!focusMode ? <FlashOffSvg /> : <FlashOnSvg />} */}
      {/*     </StyledNavButton> */}
      {/*   </StyledButtonContainer> */}
      {/* )} */}
      <StyledButtonContainer
        style={{ width: "1.25rem", flexDirection: "row-reverse" }}
      >
        <StyledNavButton onClick={openDrawer}>
          <MoreSvg />
        </StyledNavButton>
      </StyledButtonContainer>
    </NavBarContainer>
  );
};
