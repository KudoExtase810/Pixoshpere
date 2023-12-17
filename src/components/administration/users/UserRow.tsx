"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { useDrawer } from "@/contexts/DrawerContext";
import { useActionData } from "@/contexts/ActionContext";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const UserRow = ({ user }: { user: User }) => {
    return user.isAdmin ? (
        <TableRow>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>
                {dayjs(user.createdAt).format("DD MMMM YYYY")}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone || "-"}</TableCell>
        </TableRow>
    ) : (
        <TableRow>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>
                {dayjs(user.createdAt).format("DD MMMM YYYY")}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone || "-"}</TableCell>
        </TableRow>
    );
};

export default UserRow;
