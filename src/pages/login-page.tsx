import React, { FunctionComponent, useState, useEffect } from "react";
import styled from "styled-components";
import { AvatarChooser } from "../components/avatar-chooser";
import { AvatarContainer, avatars } from "../components/avatar-chooser-styled";
import { PageContainerWrapper } from "../components/page-container";
import { StyledButton, StyledInput } from "../components/question-styled";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  margin: 2rem;
  padding: 2rem;
`;

const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const StyledH1 = styled.h1`
  align-items: center;
  text-align: center;
  flex-grow: 1;
  font-size: 1rem;
  font-weight: 400;
  color: #6559ff;
  line-height: 1.5rem;
  margin-top: 2rem;
`;

export const LoginPage: FunctionComponent = () => {
  const [avatarIndex, setAvatarIndex] = useState<number>(0);
  return (
    <PageContainerWrapper>
      <PageBody>
        <StyledForm>
          <AvatarContainer size={5} style={{
            boxShadow: "0 0px 7px rgba(66, 66, 66, 0.08), 0 3px 4px rgba(66, 66, 66, 0.1)"
          }}>
            {avatars[avatarIndex]}
          </AvatarContainer>
          <StyledH1>Choose Avatar</StyledH1>
          <AvatarChooser
            onUpdate={(index: number) => {
              setAvatarIndex(index);
            }}
          />
          <StyledH1>Name</StyledH1>
          <StyledInput />
          <StyledH1>Phone Number</StyledH1>
          <StyledInput />
          <StyledButton
            active={true}
            activeColor={"#6559ff"}
            style={{ margin: "2.5rem" }}
          >
            Next
          </StyledButton>
        </StyledForm>
      </PageBody>
    </PageContainerWrapper>
  );
};
