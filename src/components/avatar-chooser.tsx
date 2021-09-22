import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { AvatarContainer, avatars } from "./avatar-chooser-styled";

const ChooserContainer = styled.div`
  overflow: scroll;
  height: 12rem;
  display: flex;
  // align-items: center;
  // justify-content: space-between;
  column-gap: 0.25rem;
  padding: 0.25rem;
  flex-wrap: wrap;
  box-shadow: inset 0 -10px 10px -10px rgba(66, 66, 66, 0.1),
    inset 0 10px 10px -10px rgba(66, 66, 66, 0.1);
  border: 1px solid #dee4ed;
  border-radius: 0.3rem;
`;

type Props = {
  onUpdate: (avatarIndex: number) => void;
};

export const AvatarChooser: FunctionComponent<Props> = ({ onUpdate }) => {
  return (
    <ChooserContainer>
      {avatars.map((a, index) => (
        <AvatarContainer
          onClick={() => {
            onUpdate(index);
          }}
          key={index}
        >
          {a}
        </AvatarContainer>
      ))}
    </ChooserContainer>
  );
};
