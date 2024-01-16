"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useActionData } from "@/contexts/ActionContext";
import { useModal } from "@/contexts/ModalContext";
import dayjs from "dayjs";

const MessageModal = () => {
    const { isOpen, toggle } = useModal();
    const { actionData, setActionData } = useActionData();
    const selectedMessage = actionData as Message;

    return (
        <Dialog
            open={isOpen("message")}
            onOpenChange={(isOpen) => {
                toggle("message");
                !isOpen && setTimeout(() => setActionData(null), 300);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {selectedMessage?.subject}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        {dayjs(selectedMessage?.createdAt).format(
                            "DD MMM YYYY | HH:mm"
                        )}
                    </p>
                    <DialogDescription className="text-primary">
                        {selectedMessage?.content}
                    </DialogDescription>
                    <p className="ml-auto">
                        By{" "}
                        <span className="text-cyan-500">{`${selectedMessage?.sender.firstName} ${selectedMessage?.sender.lastName}`}</span>{" "}
                        /{" "}
                        <span className="text-cyan-500">
                            {selectedMessage?.sender.email}
                        </span>
                    </p>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default MessageModal;
