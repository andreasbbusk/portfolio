"use client";

import { useState } from "react";
import { TextRoll } from "@/components/ui/text-roll";

interface HeaderRollProps {
  text: string;
  className: string;
}

export function HeaderRoll({ text, className }: HeaderRollProps) {
  const [isRolled, setIsRolled] = useState(false);

  return (
    <span
      className={className}
      onMouseEnter={() => setIsRolled(true)}
      onMouseLeave={() => setIsRolled(false)}
      onFocus={() => setIsRolled(true)}
      onBlur={() => setIsRolled(false)}
    >
      <TextRoll
        rolled={isRolled}
        duration={0.28}
        getEnterDelay={(index) => index * 0.02}
        getExitDelay={(index) => index * 0.02 + 0.07}
      >
        {text}
      </TextRoll>
    </span>
  );
}
