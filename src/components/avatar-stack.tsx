import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useUserProvider } from "../contexts/user-context";
import { AvatarContainer, avatars } from "./avatar-chooser-styled";

const AvatarStackContainer = styled.div`
  display: flex;
`;

export const OuterAvatarContainer = styled.div`
  position: relative;
  margin-left: -0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CircleBackground = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
`;

const MAX_STACK = 3;

type Props = {
  openDrawer: () => void;
};

export const AvatarStack: FunctionComponent<Props> = ({ openDrawer }) => {
  const { allUsers, id: myId } = useUserProvider();
  const allUserEntries = Object.entries(allUsers);
  const overflowNumber = allUserEntries.length - MAX_STACK;
  return (
    <AvatarStackContainer>
      {allUserEntries
        .sort(([id]) => (id === myId ? -1 : 0))
        .slice(0, MAX_STACK)
        .map(([id, { color, avatarIndex }], index) => (
          <OuterAvatarContainer key={index}>
            <CircleBackground style={{ zIndex: (MAX_STACK - index) * 2 }} />
            <AvatarContainer
              size={1}
              style={{
                border: `solid 2px ${id === myId ? "#6559FF" : color}`,
                zIndex: (MAX_STACK - index) * 2 + 1,
              }}
            >
              {avatars[avatarIndex]}
            </AvatarContainer>
          </OuterAvatarContainer>
        ))}
      {overflowNumber > 0 && (
        <OuterAvatarContainer onClick={openDrawer}>
          <CircleBackground style={{ zIndex: allUserEntries.length }} />
          <AvatarContainer
            size={1}
            style={{
              border: "solid 2px #dee4ed",
              zIndex: allUserEntries.length,
            }}
          >
            +{overflowNumber}
          </AvatarContainer>
        </OuterAvatarContainer>
      )}
    </AvatarStackContainer>
  );
};
