import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { PhoneSvg } from "../assets/phone-svg";
import { useUserProvider } from "../contexts/user-context";
import { AvatarContainer, avatars } from "./avatar-chooser-styled";
import { Track } from "./progress-bar";
import { InlineButton, StyledButton } from "./question-styled";

const SectionContainer = styled.div`
  // background: #f3f6fb;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 4rem;
  padding: 2rem;
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

const PerformanceSection = styled.div`
  // background: #f3f6fb;
  min-height: 4rem;
  margin: 1rem;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: left;
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

  &:active {
    border: none;
  }

  &:focus {
    border: none;
  }

  &:hover {
    border: none;
  }

  &:first-child {
    margin-left: 0.5rem;
  }
`;

export const OuterAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0.5rem 0.5rem 0;
`;

const AvatarHeroLabel = styled.div`
  text-align: center;
  margin: 0px;
  padding: 1.25rem;
  // background-color: #f3f6fb;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  color: rgb(52, 69, 99);
  font-weight: 500;
  font-size: 20px;
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

const ProgressLabel = styled(AvatarLabel)`
  text-align: left;
  margin-bottom: 0.5rem;
`;

const ProgressBarTrack = styled.div`
  margin: 0 0.25rem;
  background: #dee4ed;
  height: 4px;
  width: calc(100% - 0.25rem);
  box-sizing: border-box;
  position: relative;
`;

const ProgressBarInner = styled.div<{ percentage: number }>`
  position: absolute;
  height: 100%;
  background-color: #6559ff;
  width: ${({ percentage }) => `${percentage}%`};
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

type Props = {
  userId: string;
  closeDrawer: () => void;
  setSelectedUser: (id: string) => void;
  handleOnChange: (value: number) => void;
};

export const UserProfileDrawer: FunctionComponent<Props> = ({
  userId,
  closeDrawer,
  setSelectedUser,
  handleOnChange,
}) => {
  const { allUsers, id: myId } = useUserProvider();
  if (!allUsers[userId]) {
    return null;
  }
  const { name, phone, avatarIndex, color, currentIndex } = allUsers[userId];
  return (
    <SectionContainer>
      <ProfileSection>
        <AvatarContainer
          size={5}
          onClick={() => {
            handleOnChange(currentIndex);
            closeDrawer();
          }}
          style={{
            borderColor: `${userId === myId ? "#6559FF" : color}`,
            boxShadow: "0 0px 7px #dee4ed, 0 3px 4px #dee4ed",
          }}
        >
          {avatars[avatarIndex]}
        </AvatarContainer>
        <AvatarHeroLabel style={{ textAlign: "center" }}>
          {name}
        </AvatarHeroLabel>
        <AvatarLabel
          style={{
            textAlign: "center",
            paddingRight: "1.5rem",
          }}
        >
          <PhoneSvg />
          <a
            href={`tel:{phone}`}
            style={{ marginLeft: "0.5rem", marginBottom: "0.2rem" }}
          >
            {phone || "0448398744"}
          </a>
        </AvatarLabel>
        <InlineButton
          onClick={() => {
            handleOnChange(currentIndex);
            closeDrawer();
          }}
          style={{ background: "#dee4ed", marginTop: "1rem" }}
        >
          Jump to position
        </InlineButton>
      </ProfileSection>
      <StyledHr />
      <PerformanceSection>
        <ProgressLabel>
          Today's completed scheduled Inspections (4 / 9)
        </ProgressLabel>
        <ProgressBarTrack>
          <ProgressBarInner percentage={50} />
        </ProgressBarTrack>
        <ProgressLabel>
          Scheduled Inspections completed this week (17 / 28)
        </ProgressLabel>
        <ProgressBarTrack>
          <ProgressBarInner percentage={75} />
        </ProgressBarTrack>
      </PerformanceSection>
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
                onClick={() => {
                  setSelectedUser(id);
                }}
              >
                {avatars[avatarIndex]}
              </AvatarContainer>
              <AvatarLabel style={{ textAlign: "center" }}>{name}</AvatarLabel>
            </OuterAvatarContainer>
          ))}
      </PresenceSection>
    </SectionContainer>
  );
};
