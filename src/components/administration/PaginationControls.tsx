"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/navigation";
import {useSearchParams} from "next/navigation";

interface props {
    showingDocs: number;
    totalDocs: number;
    limit?: number;
}

const PaginationControls = ({ showingDocs, totalDocs, limit = 10 }: props) => {
    const router = useRouter();
    const readOnlySearchParams = useSearchParams();

    const currentPage =
        typeof readOnlySearchParams.get("page") === "string"
            ? Number(readOnlySearchParams.get("page"))
            : 1;

    const handlePagination = (page: "next" | "prev") => {
        const searchParams = new URLSearchParams();
        let destination = page === "next" ? currentPage + 1 : currentPage - 1;

        if (destination < 1) destination = 1;

        searchParams.set("page", destination.toString());

        // Generate the new pathname with the updated search params
        const newPathname = `${
            window.location.pathname
        }?${searchParams.toString()}`;

        router.push(newPathname, { scroll: false });
    };

    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                Showing {showingDocs} result(s) out of {totalDocs}
            </div>
            <div className="space-x-2">
                <Button
                    onClick={() => handlePagination("prev")}
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button
                    onClick={() => handlePagination("next")}
                    variant="outline"
                    size="sm"
                    disabled={
                        currentPage === Math.ceil(totalDocs / limit) ||
                        !totalDocs
                    }
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default PaginationControls;
