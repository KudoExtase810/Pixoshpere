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
import { useRouter, usePathname } from "@/lib/navigation";

type Deletable = "products" | "categories" | "coupons" | "messages";

const DeleteModal = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { isOpen, toggle } = useModal();

    const { actionData, setActionData } = useActionData();

    // We can pass the type as a prop but we'll have to remove the delete modal
    // from the admin layout and put in every page we need it in instead
    const type = pathname.replace("/administration/", "") as Deletable;

    const apiUrls: Record<Deletable, string> = {
        products: `/api/products/${actionData?._id}`,
        categories: `/api/categories/${actionData?._id}`,
        coupons: `/api/coupons/${actionData?._id}`,
        messages: `/api/messages/${actionData?._id}`,
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

            const url = apiUrls[type];
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
