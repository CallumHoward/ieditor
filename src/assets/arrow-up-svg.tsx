import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export const ArrowUpSvg: FunctionComponent<Props> = ({
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
        d="M12.819 6.367l8.866 9.52c.43.495.418 1.267-.028 1.745a1.113 1.113 0 0 1-1.625.03L12.37 9.434a.509.509 0 0 0-.755 0l-7.646 8.212c-.461.461-1.18.448-1.625-.03a1.323 1.323 0 0 1-.028-1.745l8.85-9.504c.22-.235.517-.368.827-.367a1.12 1.12 0 0 1 .827.367z"
        fill={color}
        fillRule="nonzero"
      />
    </svg>
  );
};
