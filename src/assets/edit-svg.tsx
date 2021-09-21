import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export const EditSvg: FunctionComponent<Props> = ({
  color = "#6559ff",
  style,
}) => {
  const size = "16px";
  const className = "edit-svg";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      style={style}
      className={className}
      focusable="false"
    >
      <path
        d="M2.313 9.734v1.954h1.953l5.76-5.761-1.953-1.953-5.76 5.76zm9.223-5.318a.519.519 0 0 0 0-.734l-1.218-1.219a.519.519 0 0 0-.735 0l-.953.953 1.953 1.953.953-.953z"
        fillRule="nonzero"
        fill={color}
      />
    </svg>
  );
};
