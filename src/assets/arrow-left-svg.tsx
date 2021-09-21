import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export const ArrowLeftSvg: FunctionComponent<Props> = ({
  color = "#6559ff",
  style,
  onClick,
}) => {
  const size = "16px";
  const className = "arrow-left-svg";
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={style}
      className={className}
      onClick={onClick}
      focusable="false"
      data-testid="arrow-left-svg"
    >
      <path
        d="M6.367 11.181l9.52-8.866a1.323 1.323 0 0 1 1.745.028c.479.445.492 1.164.03 1.625L9.434 11.63a.509.509 0 0 0 0 .755l8.212 7.646c.461.461.448 1.18-.03 1.625a1.323 1.323 0 0 1-1.745.028l-9.504-8.85A1.123 1.123 0 0 1 6 12.007a1.12 1.12 0 0 1 .367-.827z"
        fill={color}
        fillRule="nonzero"
      />
    </svg>
  );
};
