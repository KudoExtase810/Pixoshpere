import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Clock9, DollarSign, User, Users } from "lucide-react";
import React from "react";

const DashboardLoading = () => {
    const cardData = [
        {
            title: "Today's Revenue",
            icon: <Clock9 size={20} className="text-muted-foreground" />,
        },

        {
            title: "This Month's Revenue",
            icon: <CalendarDays size={20} className="text-muted-foreground" />,
        },
        {
            title: "All-Time Revenue",
            icon: <DollarSign size={20} className="text-muted-foreground" />,
        },
        {
            title: "Total Customers",
            icon: <Users size={20} className="text-muted-foreground" />,
        },
    ];
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12 mt-8">
                {cardData.map((card, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {card.title}
                            </CardTitle>
                            {card.icon}
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-5 w-1/2 rounded-sm mb-2" />
                            <Skeleton className="h-4 w-3/5 rounded-sm" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
                {/* Overview */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-96 w-full" />
                    </CardContent>
                </Card>
                {/* Latest sales */}
                <Card className="col-span-4 md:col-span-3">
                    <CardHeader>
                        <CardTitle>Latest Sales</CardTitle>
                        <CardDescription>Your 10 latest sales.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[...new Array(4)].map((order, idx) => (
                                <div key={idx} className="flex items-center">
                                    <User className="h-9 w-9 p-1 rounded-full" />
                                    <div className="ml-4 space-y-1">
                                        <Skeleton className="h-4 rounded-sm w-28" />
                                        <Skeleton className="h-4 rounded-sm w-40" />
                                    </div>
                                    <Skeleton className="h-4 rounded-sm w-1/5 ml-auto" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default DashboardLoading;
