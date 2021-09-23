import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export const PhoneSvg: FunctionComponent<Props> = ({
  color = "#6559ff",
  style,
}) => {
  const size = "16px";
  const className = "phone-svg";
  return (
    <svg
      data-testid="phone-svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={style}
      className={className}
      focusable="false"
    >
      <path d="M0 0h24v24H0z" fill="transparent" />
      <path
        fill={color}
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      />
    </svg>
  );
};
