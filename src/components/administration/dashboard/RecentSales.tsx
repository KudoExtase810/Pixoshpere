import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import React from "react";

const RecentSales = () => {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                    You made 265 sales this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className="flex items-center">
                        <div className="h-9 w-9 bg-green-500 rounded-full"></div>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Olivia Martin
                            </p>
                            <p className="text-sm text-muted-foreground">
                                olivia.martin@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$1,999.00</div>
                    </div>
                    <div className="flex items-center">
                        <div className="h-9 w-9 bg-green-500 rounded-full"></div>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Jackson Lee
                            </p>
                            <p className="text-sm text-muted-foreground">
                                jackson.lee@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$39.00</div>
                    </div>
                    <div className="flex items-center">
                        <div className="h-9 w-9 bg-green-500 rounded-full"></div>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Isabella Nguyen
                            </p>
                            <p className="text-sm text-muted-foreground">
                                isabella.nguyen@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$299.00</div>
                    </div>
                    <div className="flex items-center">
                        <div className="h-9 w-9 bg-green-500 rounded-full"></div>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                William Kim
                            </p>
                            <p className="text-sm text-muted-foreground">
                                will@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$99.00</div>
                    </div>
                    <div className="flex items-center">
                        <div className="h-9 w-9 bg-green-500 rounded-full"></div>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Sofia Davis
                            </p>
                            <p className="text-sm text-muted-foreground">
                                sofia.davis@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$39.00</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentSales;
