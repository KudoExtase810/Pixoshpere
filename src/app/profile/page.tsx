import { getServerSession } from "@/auth/utils";
import { AccountForm } from "@/components/customer/profile/AccountForm";
import { Separator } from "@/components/ui/separator";
import User from "@/models/user";
import React from "react";

const Account = async () => {
    const { userId } = await getServerSession();
    const userDetails = (await User.findById(userId).lean()) as User;
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account Details</h3>
                <p className="text-sm text-muted-foreground">
                    View and update your account informations.
                </p>
            </div>
            <Separator />
            <AccountForm user={userDetails} />
        </div>
    );
};

export default Account;
