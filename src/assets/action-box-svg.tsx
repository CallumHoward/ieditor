import React, { CSSProperties, FunctionComponent } from "react";

type Props = {
  color?: string;
  style?: CSSProperties;
};

export const ActionBoxSvg: FunctionComponent<Props> = ({
  color = "#344563",
  style,
}) => {
  const size = "16px";
  const className = "action-box-svg";
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      width={size}
      height={size}
      style={style}
      className={className}
      focusable="false"
    >
      <path
        d="M.789 3.192c.435 0 .788.354.788.79v10.44H12.02a.789.789 0 0 1 0 1.578H1.577c-.425 0-.8-.15-1.126-.45-.3-.326-.451-.702-.451-1.128V3.982c0-.436.353-.79.789-.79zm7.587 6.423l5.22-5.296-1.127-1.127-4.093 4.132L6.723 5.67 5.596 6.798l2.78 2.817zM14.422 0c.426 0 .79.163 1.09.488.325.3.488.664.488 1.09v9.614c0 .426-.163.802-.488 1.127-.3.326-.664.488-1.09.488H4.808c-.426 0-.802-.162-1.127-.488-.326-.325-.489-.7-.489-1.127V1.578c0-.425.163-.788.489-1.089C4.006.163 4.38 0 4.808 0h9.614z"
        fill={color}
      />
    </svg>
  );
};
