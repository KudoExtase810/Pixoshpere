"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useActionData } from "@/contexts/ActionContext";
import { useModal } from "@/contexts/ModalContext";
import { notifyError, notifySuccess } from "@/lib/utils";

import axios, { isAxiosError } from "axios";
import { useRouter, usePathname } from "next/navigation";

const DeleteModal = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { isOpen, toggle } = useModal();

    const { actionData, setActionData } = useActionData();

    const type = pathname.replace("/administration/", "") as
        | "products"
        | "categories";

    // const headings = {
    //     user: `Delete ${(actionData as User)?.username}?`,
    //     article: `Delete ${(actionData as Article)?.title}?`,
    //     category: `Delete the "${(actionData as Category)?.label}" category?`,
    //     tag: `Delete the "${(actionData as Tag)?.label}" tag?`,
    // };

    const getDeleteURL = () => {
        let api_url: string;

        switch (type) {
            case "categories":
                api_url = `/api/categories/${actionData?._id}`;
                break;

            case "products":
                api_url = `/api/products/${actionData?.slug}`;
                break;

            default:
                throw new Error("Invalid type passed to the delete modal.");
        }

        return api_url;
    };

    const handleDelete = async () => {
        try {
            const url = getDeleteURL();
            const { data } = await axios.delete(url);
            notifySuccess(data.message);
            router.refresh();
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };

    return (
        <AlertDialog
            open={isOpen("delete")}
            onOpenChange={() => toggle("delete")}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete{" "}
                        <span className="text-destructive">
                            "{actionData?.title || actionData?.label}"
                        </span>{" "}
                        from {type}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This entry will be permanently deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteModal;
