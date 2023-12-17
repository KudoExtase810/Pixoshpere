import GeneralData from "@/components/administration/dashboard/GeneralData";
import Overview from "@/components/administration/dashboard/Overview";
import RecentSales from "@/components/administration/dashboard/RecentSales";
import React from "react";

const Dashboard = () => {
    return (
        <>
            <GeneralData />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Overview />
                <RecentSales />
            </div>
        </>
    );
};

export default Dashboard;
