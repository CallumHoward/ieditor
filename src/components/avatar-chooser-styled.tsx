import React from "react";
import styled from "styled-components";

const defaultSize = 2.5;
export const AvatarContainer = styled.div<{ size?: number }>`
  // clip-path: circle(${(p) => p.size || defaultSize}rem at center);
  border-radius: 50%;
  background: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 9px;
  color: #949FB2;

  width: ${(p) => p.size || defaultSize}rem;
  height: ${(p) => p.size || defaultSize}rem;
  border: ${(p) => Math.floor((p.size || defaultSize + 2) - 2)}px solid #dee4ed;
  padding: 0.1rem;
  margin: 0.25rem;
  svg {
    width: ${(p) => p.size || defaultSize}rem;
    height: ${(p) => p.size || defaultSize}rem;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const avatars = [
  <StyledImg src="img/avatars/avatar-27.png" key={"Avatar27"} alt="Avatar27" />,
  <StyledImg src="img/avatars/avatar-19.png" key={"Avatar19"} alt="Avatar19" />,
  <StyledImg src="img/avatars/avatar-35.png" key={"Avatar35"} alt="Avatar35" />,
  <StyledImg src="img/avatars/avatar-15.png" key={"Avatar15"} alt="Avatar15" />,
  <StyledImg src="img/avatars/avatar-33.png" key={"Avatar33"} alt="Avatar33" />,
  <StyledImg src="img/avatars/avatar-39.png" key={"Avatar39"} alt="Avatar39" />,
  <StyledImg src="img/avatars/avatar-14.png" key={"Avatar14"} alt="Avatar14" />,
  <StyledImg src="img/avatars/avatar-13.png" key={"Avatar13"} alt="Avatar13" />,
  <StyledImg src="img/avatars/avatar-32.png" key={"Avatar32"} alt="Avatar32" />,
  <StyledImg src="img/avatars/avatar-29.png" key={"Avatar29"} alt="Avatar29" />,
  <StyledImg src="img/avatars/avatar-34.png" key={"Avatar34"} alt="Avatar34" />,
  <StyledImg src="img/avatars/avatar-20.png" key={"Avatar20"} alt="Avatar20" />,
  <StyledImg src="img/avatars/avatar-17.png" key={"Avatar17"} alt="Avatar17" />,
  <StyledImg src="img/avatars/avatar-21.png" key={"Avatar21"} alt="Avatar21" />,
  <StyledImg src="img/avatars/avatar-04.png" key={"Avatar04"} alt="Avatar04" />,
  <StyledImg src="img/avatars/avatar-10.png" key={"Avatar10"} alt="Avatar10" />,
  <StyledImg src="img/avatars/avatar-01.png" key={"Avatar01"} alt="Avatar01" />,
  <StyledImg src="img/avatars/avatar-31.png" key={"Avatar31"} alt="Avatar31" />,
  <StyledImg src="img/avatars/avatar-36.png" key={"Avatar36"} alt="Avatar36" />,
  <StyledImg src="img/avatars/avatar-08.png" key={"Avatar08"} alt="Avatar08" />,
  <StyledImg src="img/avatars/avatar-11.png" key={"Avatar11"} alt="Avatar11" />,
  <StyledImg src="img/avatars/avatar-23.png" key={"Avatar23"} alt="Avatar23" />,
  <StyledImg src="img/avatars/avatar-25.png" key={"Avatar25"} alt="Avatar25" />,
  <StyledImg src="img/avatars/avatar-02.png" key={"Avatar02"} alt="Avatar02" />,
  <StyledImg src="img/avatars/avatar-30.png" key={"Avatar30"} alt="Avatar30" />,
  <StyledImg src="img/avatars/avatar-40.png" key={"Avatar40"} alt="Avatar40" />,
  <StyledImg src="img/avatars/avatar-03.png" key={"Avatar03"} alt="Avatar03" />,
  <StyledImg src="img/avatars/avatar-37.png" key={"Avatar37"} alt="Avatar37" />,
  <StyledImg src="img/avatars/avatar-16.png" key={"Avatar16"} alt="Avatar16" />,
  <StyledImg src="img/avatars/avatar-28.png" key={"Avatar28"} alt="Avatar28" />,
  <StyledImg src="img/avatars/avatar-22.png" key={"Avatar22"} alt="Avatar22" />,
  <StyledImg src="img/avatars/avatar-12.png" key={"Avatar12"} alt="Avatar12" />,
  <StyledImg src="img/avatars/avatar-38.png" key={"Avatar38"} alt="Avatar38" />,
  <StyledImg src="img/avatars/avatar-07.png" key={"Avatar07"} alt="Avatar07" />,
  <StyledImg src="img/avatars/avatar-09.png" key={"Avatar09"} alt="Avatar09" />,
  <StyledImg src="img/avatars/avatar-18.png" key={"Avatar18"} alt="Avatar18" />,
  <StyledImg src="img/avatars/avatar-26.png" key={"Avatar26"} alt="Avatar26" />,
  <StyledImg src="img/avatars/avatar-06.png" key={"Avatar06"} alt="Avatar06" />,
  <StyledImg src="img/avatars/avatar-24.png" key={"Avatar24"} alt="Avatar24" />,
  <StyledImg src="img/avatars/avatar-05.png" key={"Avatar05"} alt="Avatar05" />,
];
