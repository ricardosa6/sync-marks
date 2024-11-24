import { SVGProps } from "react";

export const IconPassword = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      aria-hidden="true"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 10v4" />
      <path d="M10 13l4 -2" />
      <path d="M10 11l4 2" />
      <path d="M5 10v4" />
      <path d="M3 13l4 -2" />
      <path d="M3 11l4 2" />
      <path d="M19 10v4" />
      <path d="M17 13l4 -2" />
      <path d="M17 11l4 2" />
    </svg>
  );
};
