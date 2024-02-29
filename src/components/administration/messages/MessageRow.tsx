"use client";
import dayjs from "dayjs";

import { TableCell, TableRow } from "@/components/ui/table";
import { MailOpen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import { useActionData } from "@/contexts/ActionContext";

const MessageRow = ({ message }: { message: Message }) => {
    const { toggle: toggleModal } = useModal();
    const { actionData, setActionData } = useActionData();

    const handleOpen = () => {
        setActionData(message);
        toggleModal("message");
    };

    const handleDelete = () => {
        setActionData(message);
        toggleModal("delete");
    };
    return (
        <TableRow>
            <TableCell className="font-medium">
                {`${message.sender.firstName} ${message.sender.lastName}`}
            </TableCell>
            <TableCell>{message.sender.email}</TableCell>
            <TableCell>
                {dayjs(message.createdAt).format("DD MMMM YYYY")}
            </TableCell>
            <TableCell>{message.subject}</TableCell>
            <TableCell className="flex items-center gap-0.5">
                <Button
                    onClick={handleOpen}
                    variant="ghost"
                    className="p-1 h-min text-green-500 hover:text-green-600"
                >
                    <MailOpen size={20} />
                </Button>
                <Button
                    onClick={handleDelete}
                    variant="ghost"
                    className="p-1 h-min text-red-500 hover:text-red-600"
                >
                    <Trash size={20} />
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default MessageRow;
