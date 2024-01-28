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

interface ProfileMenuProps {
    signOut: () => Promise<void>;
}

const ProfileMenu = ({ signOut }: ProfileMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={null}
                    className="px-2 flex items-center gap-1.5 text-teal-500 hover:text-teal-600"
                >
                    <CircleUserRound /> <span>Alaa K.</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="center" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            shadcn
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                            {"alaakudo@gmail.com"}
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
