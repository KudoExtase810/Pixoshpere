"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
    orders: Pick<Order, "_id" | "total" | "createdAt">[];
}

const Overview = ({ orders }: OverviewProps) => {
    function sumTotals(orders: OverviewProps["orders"]) {
        return orders.reduce((total, order) => total + order.total, 0);
    }

    const data = [
        {
            name: "Jan",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 0
                )
            ),
        },
        {
            name: "Feb",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 1
                )
            ),
        },
        {
            name: "Mar",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 2
                )
            ),
        },
        {
            name: "Apr",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 3
                )
            ),
        },
        {
            name: "May",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 4
                )
            ),
        },
        {
            name: "Jun",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 5
                )
            ),
        },
        {
            name: "Jul",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 6
                )
            ),
        },
        {
            name: "Aug",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 7
                )
            ),
        },
        {
            name: "Sep",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 8
                )
            ),
        },
        {
            name: "Oct",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 9
                )
            ),
        },
        {
            name: "Nov",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 10
                )
            ),
        },
        {
            name: "Dec",
            total: sumTotals(
                orders.filter(
                    (order) => new Date(order.createdAt).getMonth() === 11
                )
            ),
        },
    ];

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Bar
                            dataKey="total"
                            fill="#14B8A6"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default Overview;
