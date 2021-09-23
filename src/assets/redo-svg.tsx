import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export const RedoSvg: FunctionComponent<Props> = ({
  color = "#6559ff",
  style,
}) => {
  const size = "16px";
  const className = "redo-svg";
  return (
    <svg
      viewBox="0 0 16 14"
      fill="none"
      width={size}
      height={size}
      style={style}
      className={className}
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6775 5.49348L11.9807 9.13743C11.5592 9.55293 10.8839 9.54476 10.4723 9.11919C10.0608 8.69362 10.0689 8.0118 10.4904 7.5963L12.3139 5.79882H5.22667C3.51288 5.79882 2.13333 7.15867 2.13333 8.82249C2.13333 10.4863 3.51288 11.8462 5.22667 11.8462H11.2356C11.8247 11.8462 12.3022 12.3283 12.3022 12.9231C12.3022 13.5178 11.8247 14 11.2356 14H5.22667C2.34596 14 0 11.6875 0 8.82249C0 5.95743 2.34596 3.64497 5.22667 3.64497H12.3139L10.4904 1.84749C10.0689 1.43199 10.0608 0.750168 10.4723 0.324597C10.8839 -0.100973 11.5592 -0.109138 11.9807 0.306359L15.6773 3.95013C15.68 3.95285 15.6828 3.95559 15.6855 3.95834C15.7955 4.06869 15.8766 4.19723 15.9289 4.33441C15.9748 4.45465 16 4.5853 16 4.72189C16 4.85849 15.9748 4.98914 15.9289 5.10938C15.8755 5.24948 15.792 5.38056 15.6785 5.49246L15.6775 5.49348Z"
        fill={color}
      />
    </svg>
  );
};