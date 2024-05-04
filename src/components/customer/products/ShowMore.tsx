import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { CircleArrowRight } from "lucide-react";

interface ShowMoreProps {
    currentPage: number;
    totalDocs: number;
    limit: number;
}

const ShowMore = ({ currentPage, totalDocs, limit }: ShowMoreProps) => {
    const shouldDisable = currentPage === Math.ceil(totalDocs / limit);

    return (
        <div className="w-full flex justify-center">
            {!shouldDisable ? (
                <Link
                    className={cn(
                        buttonVariants({ variant: "action" }),
                        "my-8 w-full sm:w-40"
                    )}
                    href={`?page=${currentPage + 1}`}
                >
                    Next page <CircleArrowRight className="ml-1.5" size={18} />
                </Link>
            ) : (
                <Button
                    variant="action"
                    className="my-8 w-full sm:w-40"
                    disabled
                >
                    Next page <CircleArrowRight className="ml-1.5" size={18} />
                </Button>
            )}
        </div>
    );
};

export default ShowMore;
