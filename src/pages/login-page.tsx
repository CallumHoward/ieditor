import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AvatarChooser } from "../components/avatar-chooser";
import { AvatarContainer, avatars } from "../components/avatar-chooser-styled";
import { PageContainerWrapper } from "../components/page-container";
import { StyledButton, StyledInput } from "../components/question-styled";
import { useUserProvider } from "../contexts/user-context";

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
  margin-top: 1rem;
`;

export const LoginPage: FunctionComponent = () => {
  const { setName, setPhone, avatarIndex, setAvatarIndex, clearAllData } = useUserProvider();
  return (
    <PageContainerWrapper>
      <PageBody>
        <StyledForm>
          <AvatarContainer
            size={5}
            style={{
              borderColor: "#6559ff",
              boxShadow: "0 0px 7px #dee4ed, 0 3px 4px #dee4ed",
            }}
          >
            {avatars[avatarIndex]}
          </AvatarContainer>
          <StyledH1>Choose Avatar</StyledH1>
          <AvatarChooser
            onUpdate={(index: number) => {
              setAvatarIndex(index);
            }}
          />
          <StyledH1>Name</StyledH1>
          <StyledInput
            onBlur={(e) => {
              if (e.target.value === "clearalldata123") {
                clearAllData();
                console.info("Cleared all data from YJS server");
              } else {
                setName(e.target.value);
              }
            }}
          />
          <StyledH1>Phone</StyledH1>
          <StyledInput
            type={"number"}
            onBlur={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Link to={"/edit"} style={{ textDecoration: "none" }}>
            <StyledButton
              active={true}
              activeColor={"#6559ff"}
              style={{ marginTop: "2rem" }}
            >
              Next
            </StyledButton>
          </Link>
        </StyledForm>
      </PageBody>
    </PageContainerWrapper>
  );
};
