import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export const FlashOnSvg: FunctionComponent<Props> = ({
  color = "#6559ff",
  style,
}) => {
  const size = "16px";
  const className = "flash-on-svg";
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={style}
      className={className}
      focusable="false"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M7 2v11h3v9l7-12h-4l3-8z" fill={color} />
    </svg>
  );
};
