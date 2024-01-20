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

    // We can pass the type as a prop but we'll have to remove the delete modal
    // from the admin layout and put in every page we need it in instead
    const type = pathname.replace("/administration/", "") as
        | "products"
        | "categories"
        | "coupons"
        | "orders"
        | "messages";

    const getDeleteURL = () => {
        let api_url;

        switch (type) {
            case "products":
                api_url = `/api/products/${actionData?._id}`;
                break;
            case "categories":
                api_url = `/api/categories/${actionData?._id}`;
                break;
            case "coupons":
                api_url = `/api/coupons/${actionData?._id}`;
                break;

            case "orders":
                api_url = `/api/orders${actionData?._id}`;

            case "messages":
                api_url = `/api/messages/${actionData?._id}`;
                break;

            default:
                throw new Error("Invalid type passed to the delete modal.");
        }

        return api_url;
    };

    const checkData = () => {
        let error = null;
        const categoryToDelete = actionData as Category;
        if (categoryToDelete.productCount) {
            error = `This category has ${categoryToDelete.productCount} product(s). Assign each one to a category before being able to proceed.`;
        }
        return { error };
    };

    const handleDelete = async () => {
        try {
            const { error } = checkData();
            if (error) return notifyError(error);

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
            onOpenChange={(isOpen) => {
                toggle("delete");
                !isOpen && setActionData(null);
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to continue?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        The selected entry will be{" "}
                        <span className="text-red-500">permanently</span>{" "}
                        deleted.
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
