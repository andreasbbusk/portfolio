import { SVGProps } from "react";

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14 19L21 12L14 5" stroke="currentColor" strokeMiterlimit="10"></path>
      <path d="M21 12H2" stroke="currentColor" strokeMiterlimit="10"></path>
    </svg>
  );
}
