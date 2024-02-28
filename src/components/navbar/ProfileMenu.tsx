import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProfileMenuProps {
    signOut: () => Promise<void>;
    userDetails: Pick<User, "firstName" | "lastName" | "email">;
}

const ProfileMenu = ({ signOut, userDetails }: ProfileMenuProps) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant={null}
                    className={cn(
                        "px-2 flex items-center gap-1.5 text-teal-500 hover:text-teal-600",
                        userDetails.firstName.length > 8 && "text-xs"
                    )}
                >
                    <CircleUserRound />
                    <span>{`${
                        userDetails.firstName
                    } ${userDetails.lastName.charAt(0)}.`}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="center" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            shadcn
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                            {userDetails.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/profile" className="w-full">
                            My Account
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/profile/orders" className="w-full">
                            Order History
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button className="w-full text-left" onClick={signOut}>
                        Log out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileMenu;
