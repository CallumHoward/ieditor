import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { DuplicateSvg } from "../assets/duplicate-svg";
import { EditSvg } from "../assets/edit-svg";
import { PdfDocumentSvg } from "../assets/pdf-document-svg";
import { UserAddSvg } from "../assets/user-add-svg";
import { User, useUserProvider } from "../contexts/user-context";
import { AvatarContainer, avatars } from "./avatar-chooser-styled";
import { StyledH1 } from "./nav-bar-styled";
import { StyledButton } from "./question-styled";

const SectionContainer = styled.div``;

const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 4rem;
`;

const PresenceSection = styled.div`
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  min-height: 4rem;
  display: flex;
  flex-direction: row;
`;

const OptionsSection = styled.div`
  min-height: 4rem;
  margin: 2rem 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHr = styled.hr`
  border: solid 1px #dee4ed;
`;

const StyledOptionButton = styled(StyledButton)`
  margin-bottom: 0.5rem;
  width: 100%;
  justify-content: start;
`;

const OuterAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0.5rem 0.5rem 0 0.5rem;
`;

const AvatarLabel = styled.div`
  margin: 0px;
  padding: 0.25rem;
  // background-color: #f3f6fb;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  color: rgb(52, 69, 99);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.025rem;
  line-height: 1.25rem;
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
`;

const TemplateLogo = styled.img`
  margin-left: 0.5rem;
  padding: 0.25rem;
  border: solid 1px #dee4ed;
  width: 2rem;
  height: 2rem;
`;

const TemplateLabelGroup = styled.div`
  margin-left: 1rem;
  p {
    margin: 0.25rem 0;
  }
`;

export const BottomDrawer: FunctionComponent = () => {
  // const { allUsers } = useUserProvider();
  // console.log("LOG allUsers: ", allUsers);
  const allUsers: User[] = [
    { name: "Alice", color: "blue", avatarIndex: 13, currentIndex: 1 },
    { name: "Bob", color: "green", avatarIndex: 19, currentIndex: 4 },
    { name: "Charlie", color: "green", avatarIndex: 29, currentIndex: 4 },
    { name: "Bob", color: "green", avatarIndex: 15, currentIndex: 4 },
    { name: "Bob", color: "green", avatarIndex: 12, currentIndex: 4 },
    { name: "Bob", color: "green", avatarIndex: 11, currentIndex: 4 },
    { name: "Bob", color: "green", avatarIndex: 18, currentIndex: 4 },
    { name: "Bob", color: "green", avatarIndex: 10, currentIndex: 4 },
  ];

  return (
    <SectionContainer>
      <InfoSection>
        <TemplateLogo src="/logo.png" alt="template-icon" />
        <TemplateLabelGroup style={{marginLeft: "1rem"}}>
          <p>Toolbox Talk Meeting Record</p>
          <p style={{fontSize: "10px"}}>Toolbox Talk Meeting Record</p>
        </TemplateLabelGroup>
      </InfoSection>
      <StyledHr />
      <PresenceSection>
        {Object.values(allUsers).map(({ name, color, avatarIndex }, index) => (
          <OuterAvatarContainer key={index}>
            <AvatarContainer style={{ borderColor: color }}>
              {avatars[avatarIndex]}
            </AvatarContainer>
            <AvatarLabel>{name}</AvatarLabel>
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
