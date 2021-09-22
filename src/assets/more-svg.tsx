import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
};

export const MoreSvg: FunctionComponent<Props> = ({
  color = "#6559ff",
  style,
}) => {
  const size = "16px";
  const className = "more-svg";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      className={className}
      style={style}
      focusable="false"
    >
      <g transform="translate(5.542 1.458)" fill={color} fillRule="nonzero">
        <circle
          transform="rotate(90 1.458 5.542)"
          cx={1.458}
          cy={5.542}
          r={1.458}
        />
        <circle
          transform="rotate(90 1.458 9.625)"
          cx={1.458}
          cy={9.625}
          r={1.458}
        />
        <circle
          transform="rotate(90 1.458 1.458)"
          cx={1.458}
          cy={1.458}
          r={1.458}
        />
      </g>
    </svg>
  );
};
