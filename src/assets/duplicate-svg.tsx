import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export const DuplicateSvg: FunctionComponent<Props> = ({
  color = "#6559ff",
  style,
}) => {
  const size = "16px";
  const className = "duplicate-svg";
  return (
    <svg
      viewBox="0 0 12 12"
      width={size}
      height={size}
      style={style}
      className={className}
      focusable="false"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(-422 -70)">
          <g transform="translate(420 68)">
            <path id="Path" d="M0 0h16v16H0z" />
            <g
              id="ungroup"
              transform="translate(2 2)"
              fill={color}
              fillRule="nonzero"
            >
              <path
                d="M8.25 9H.75A.75.75 0 0 1 0 8.25V.75A.75.75 0 0 1 .75 0h7.5A.75.75 0 0 1 9 .75v7.5a.75.75 0 0 1-.75.75z"
                id="Path"
              />
              <path
                d="M11.25 12H3v-1.5h7.5V3H12v8.25a.75.75 0 0 1-.75.75z"
                id="Path"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
