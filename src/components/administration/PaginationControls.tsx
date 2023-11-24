"use client";
import { Button } from "@/components/ui/button";

const PaginationControls = () => {
    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                10 produit(s) affiché(s) sur 28.
            </div>
            <div className="space-x-2">
                <Button variant="outline" size="sm">
                    Précédent
                </Button>
                <Button variant="outline" size="sm">
                    Suivant
                </Button>
            </div>
        </div>
    );
};

export default PaginationControls;
