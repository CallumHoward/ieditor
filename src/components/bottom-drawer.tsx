import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { DuplicateSvg } from "../assets/duplicate-svg";
import { EditSvg } from "../assets/edit-svg";
import { PdfDocumentSvg } from "../assets/pdf-document-svg";
import { UserAddSvg } from "../assets/user-add-svg";
import { useUserProvider } from "../contexts/user-context";
import { AvatarContainer, avatars } from "./avatar-chooser-styled";
import { StyledButton } from "./question-styled";

const SectionContainer = styled.div`
  // background: #f3f6fb;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 4rem;
`;

const PresenceSection = styled.div`
  background: #f8fbfe;
  border-top: solid 1px #dee4ed;
  border-bottom: solid 1px #dee4ed;
  z-index: 100;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  min-height: 4rem;
  display: flex;
  flex-direction: row;
`;

const OptionsSection = styled.div`
  // background: #f3f6fb;
  min-height: 4rem;
  margin: 1rem;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHr = styled.hr`
  border: solid 0px #dee4ed;
`;

const StyledOptionButton = styled(StyledButton)`
  margin: 0.25rem 1rem;
  padding: 1.2rem 1.25rem;
  border: none;
  width: 100%;
  justify-content: start;
`;

export const OuterAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0.5rem 0.5rem 0;
`;

const AvatarLabel = styled.div`
  text-align: center;
  margin: 0px;
  padding: 0.25rem;
  // background-color: #f3f6fb;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  color: rgb(52, 69, 99);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.025rem;
  line-height: 1rem;
  cursor: pointer;
  outline: 0px;
  text-align: center;
  text-overflow: ellipsis;
  transition: all 200ms ease 0s;
  user-select: none;
  word-break: normal;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: left;
`;

const ButtonLabel = styled.div`
  flex-grow: 1;
  text-align: left;
  color: #081833;
`;

const TemplateLogo = styled.img`
  margin-left: 1rem;
  background: #ffffff;
  padding: 0.25rem;
  width: 2rem;
  height: 2rem;
  box-shadow: 0 0px 7px #e8eef8, 0 3px 4px #e8eef8;
`;

const TemplateLabelGroup = styled.div`
  margin-left: 1rem;
  p {
    margin: 0.25rem 0;
  }
`;

export const BottomDrawer: FunctionComponent = () => {
  const { allUsers, id: myId } = useUserProvider();
  return (
    <SectionContainer>
      <InfoSection>
        <TemplateLogo src="logo.png" alt="template-icon" />
        <TemplateLabelGroup style={{ marginLeft: "1rem" }}>
          <p style={{ fontWeight: 500 }}>Toolbox Talk Meeting Record</p>
          <p style={{ fontSize: "12px", color: "#5e6c84" }}>
            Toolbox Talk Meeting Record
          </p>
        </TemplateLabelGroup>
      </InfoSection>
      <StyledHr />
      <PresenceSection>
        {Object.entries(allUsers)
          .sort(([id]) => (id === myId ? -1 : 0))
          .map(([id, { name, color, avatarIndex }], index) => (
            <OuterAvatarContainer key={index}>
              <AvatarContainer
                size={3.5}
                style={{
                  border: `solid 2px ${id === myId ? "#6559FF" : color}`,
                }}
              >
                {avatars[avatarIndex]}
              </AvatarContainer>
              <AvatarLabel style={{ textAlign: "center" }}>{name}</AvatarLabel>
            </OuterAvatarContainer>
          ))}
      </PresenceSection>
      <StyledHr />
      <OptionsSection>
        <StyledOptionButton active={false}>
          <ButtonLabel>Edit Template</ButtonLabel>
          <EditSvg />
        </StyledOptionButton>
        <StyledOptionButton active={false}>
          <ButtonLabel>Invite to collaborate</ButtonLabel>
          <UserAddSvg />
        </StyledOptionButton>
        {/* <StyledOptionButton>Copy link to Inspection</StyledOptionButton> */}
        {/* <StyledOptionButton>Copy link to current question</StyledOptionButton> */}
        <StyledOptionButton active={false}>
          <ButtonLabel>Export as PDF Report</ButtonLabel>
          <PdfDocumentSvg />
        </StyledOptionButton>
        <StyledOptionButton active={false}>
          <ButtonLabel>Duplicate Inspection</ButtonLabel>
          <DuplicateSvg />
        </StyledOptionButton>
      </OptionsSection>
    </SectionContainer>
  );
};
