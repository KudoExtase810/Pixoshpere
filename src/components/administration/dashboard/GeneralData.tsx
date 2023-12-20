import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock9, DollarSign, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface props {
    stats: {
        totalCustomers: number;
        totalRevenue: number;
        currentMonthRevenue: number;
        todaysRevenue: number;
    };
}

const GeneralData = ({
    stats: { totalCustomers, todaysRevenue, currentMonthRevenue, totalRevenue },
}: props) => {
    const cardData = [
        {
            title: "Today's Revenue",
            icon: <Clock9 size={20} className="text-muted-foreground" />,
            value: formatPrice(todaysRevenue),
            description: "+20.1% from last month",
        },

        {
            title: "This Month's Revenue",
            icon: <CalendarDays size={20} className="text-muted-foreground" />,
            value: formatPrice(currentMonthRevenue),
            description: "+19% from last month",
        },
        {
            title: "All-Time Revenue",
            icon: <DollarSign size={20} className="text-muted-foreground" />,
            value: formatPrice(totalRevenue),
            description: "+201 since last hour",
        },
        {
            title: "Total Customers",
            icon: <Users size={20} className="text-muted-foreground" />,
            value: totalCustomers,
            description: "+180.1% from last month",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {cardData.map((card, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {card.title}
                        </CardTitle>
                        {card.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {card.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default GeneralData;
