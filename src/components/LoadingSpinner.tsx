import { Loader2 } from "lucide-react";
import React from "react";

const LoadingSpinner = ({ size }: { size?: number }) => {
    return <Loader2 size={size} className="animate-spin" />;
};

export default LoadingSpinner;
