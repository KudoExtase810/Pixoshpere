import { SearchX } from "lucide-react";
import React from "react";

const NoResults = () => {
    return (
        <p className="flex flex-col items-center justify-center gap-2.5 text-2xl h-64">
            <SearchX size={42} />
            No results were found
        </p>
    );
};

export default NoResults;
