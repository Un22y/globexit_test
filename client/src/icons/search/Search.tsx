import React from "react";

export const Search = ({
  className,
  color,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={className}
      width="20.000000"
      height="20.000000"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Union"
        d="M13.8 13.8C10.87 16.73 6.12 16.73 3.19 13.8C0.26 10.87 0.26 6.12 3.19 3.19C6.12 0.26 10.87 0.26 13.8 3.19C16.73 6.12 16.73 10.87 13.8 13.8ZM14.14 14.85C10.8 17.82 5.69 17.71 2.48 14.51C-0.83 11.19 -0.83 5.8 2.48 2.48C5.8 -0.83 11.19 -0.83 14.51 2.48C17.71 5.69 17.82 10.8 14.85 14.14L19.46 18.75C19.65 18.95 19.65 19.26 19.46 19.46C19.26 19.65 18.94 19.65 18.75 19.46L14.14 14.85Z"
        fill={color || "#432EAB"}
        fill-opacity="1.000000"
        fill-rule="evenodd"
      />
    </svg>
  );
};
