import GeneralData from "@/components/administration/dashboard/GeneralData";
import Overview from "@/components/administration/dashboard/Overview";
import LatestSales from "@/components/administration/dashboard/LatestSales";
import Order from "@/models/order";
import Product from "@/models/product";
import User from "@/models/user";
import dayjs from "dayjs";
import mongoose from "mongoose";
import React from "react";

const Dashboard = async () => {
    const totalCustomers = await User.countDocuments({ isAdmin: false });

    const latestOrders = await Order.find<Order>()
        .limit(10)
        .sort({ createdAt: "descending" })
        .select("customer total")
        .populate({ path: "customer", select: "email firstName lastName" });

    const totalRevenueResult = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSum: { $sum: "$total" },
            },
        },
    ]);

    const startOfMonth = dayjs().startOf("month");
    const currentMonthRevenueResult = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: startOfMonth.toDate() },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$total" },
            },
        },
    ]);

    const startOfDay = dayjs().startOf("day");
    const todaysRevenueResult = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: startOfDay.toDate() },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$total" },
            },
        },
    ]);

    return (
        <>
            <GeneralData
                stats={{
                    totalCustomers,

                    totalRevenue:
                        totalRevenueResult.length > 0
                            ? totalRevenueResult[0].totalSum
                            : 0,
                    currentMonthRevenue:
                        currentMonthRevenueResult.length > 0
                            ? currentMonthRevenueResult[0].totalRevenue
                            : 0,
                    todaysRevenue:
                        todaysRevenueResult.length > 0
                            ? todaysRevenueResult[0].totalRevenue
                            : 0,
                }}
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Overview />
                <LatestSales latestOrders={latestOrders} />
            </div>
        </>
    );
};

export default Dashboard;
