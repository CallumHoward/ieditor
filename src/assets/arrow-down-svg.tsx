import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export const ArrowDownSvg: FunctionComponent<Props> = ({
  color = "#6559ff",
  style,
  onClick,
}) => {
  const size = "16px";
  const className = "media-svg";
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={style}
      className={className}
      onClick={onClick}
      focusable="false"
    >
      <path
        d="M12.819 17.633l8.866-9.52a1.323 1.323 0 0 0-.028-1.745 1.113 1.113 0 0 0-1.625-.03l-7.663 8.228a.509.509 0 0 1-.755 0L3.968 6.354a1.113 1.113 0 0 0-1.625.03 1.323 1.323 0 0 0-.028 1.745l8.85 9.504c.22.235.517.368.827.367a1.12 1.12 0 0 0 .827-.367z"
        fill={color}
        fillRule="nonzero"
      />
    </svg>
  );
};
