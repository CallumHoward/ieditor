import styled from "styled-components";

export const NAVBAR_HEIGHT = "3rem";

export const NavBarContainer = styled.header`
  user-select: none;
  width: 100%;
  height: ${NAVBAR_HEIGHT};
  padding: 0 1rem;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #ffffff;
  box-shadow: 0 0px 7px rgba(66, 66, 66, 0.08), 0 3px 4px rgba(66, 66, 66, 0.1);
`;

export const StyledNavButton = styled.div`
  color: #6559ff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const StyledButtonContainer = styled.div`
  width: 2rem;
  display: inline-flex;
  align-items: center;
`;

export const StyledH1 = styled.h1`
  align-items: center;
  text-align: center;
  flex-grow: 1;
  font-size: 1rem;
  font-weight: 400;
  color: #6559ff;
  line-height: 1.5rem;
`;
