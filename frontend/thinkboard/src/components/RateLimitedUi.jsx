import React from "react";
import { ZapIcon } from "lucide-react";

const RateLimitedUi = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ZapIcon className="w-12 h-12 text-yellow-500" />
      <p>Rate Limited</p>
    </div>
  );
};

export default RateLimitedUi;
