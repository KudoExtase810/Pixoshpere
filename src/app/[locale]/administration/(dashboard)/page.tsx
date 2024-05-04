import GeneralData from "@/components/administration/dashboard/GeneralData";
import Overview from "@/components/administration/dashboard/Overview";
import LatestOrders from "@/components/administration/dashboard/LatestOrders";
import Order from "@/models/order";
import User from "@/models/user";
import dayjs from "dayjs";
import React from "react";
import connectDB from "@/lib/connectdb";

const Dashboard = async () => {
    await connectDB();
    const totalCustomers = await User.countDocuments({ isAdmin: false });

    const latestOrders = (await Order.find()
        .limit(10)
        .sort({ createdAt: "descending" })
        .select("customer total")
        .populate({ path: "customer", select: "email firstName lastName" })
        .lean()) as Pick<Order, "_id" | "customer" | "total">[];

    const totalRevenueResult = await Order.aggregate([
        {
            $match: {
                status: "delivered",
            },
        },
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
                status: "delivered",
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
                status: "delivered",
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$total" },
            },
        },
    ]);

    const startOfYear = dayjs().startOf("year");
    const ordersForThisYear = await Order.find({
        createdAt: { $gte: startOfYear.toDate() },
        status: "delivered",
    })
        .select("createdAt total")
        .lean();

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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
                <Overview
                    orders={JSON.parse(JSON.stringify(ordersForThisYear))}
                />
                <LatestOrders
                    latestOrders={JSON.parse(JSON.stringify(latestOrders))}
                />
            </div>
        </>
    );
};

export default Dashboard;
