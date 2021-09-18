import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
};

export const MediaSvg: FunctionComponent<Props> = ({ color = "#344563", style }) => {
  const size = "16px";
  const className = "media-svg";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={style}
      className={className}
      focusable="false"
      fill="none"
    >
      <path
        d="M16 11.2V1.6c0-.88-.72-1.6-1.6-1.6H4.8c-.88 0-1.6.72-1.6 1.6v9.6c0 .88.72 1.6 1.6 1.6h9.6c.88 0 1.6-.72 1.6-1.6zM7.52 8.424l1.304 1.744 2.064-2.576a.4.4 0 0 1 .624 0l2.368 2.96a.399.399 0 0 1-.312.648H5.6a.4.4 0 0 1-.32-.64l1.6-2.136a.406.406 0 0 1 .64 0zM0 4v10.4c0 .88.72 1.6 1.6 1.6H12c.44 0 .8-.36.8-.8 0-.44-.36-.8-.8-.8H2.4c-.44 0-.8-.36-.8-.8V4c0-.44-.36-.8-.8-.8-.44 0-.8.36-.8.8z"
        fill={color}
      />
    </svg>
  );
};
