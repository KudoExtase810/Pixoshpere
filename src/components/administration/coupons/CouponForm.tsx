import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, notifyError, notifySuccess } from "@/lib/utils";

import axios, { isAxiosError } from "axios";

import LoadingSpinner from "../../LoadingSpinner";
import { useRouter } from "@/lib/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import { useActionData } from "@/contexts/ActionContext";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
    code: z
        .string()
        .min(2, "The label can't contain less than 2 characters.")
        .max(32, "The label can't contain more than 32 characters."),
    discountType: z.string(),
    discountValue: z.coerce.number(),
    expiresAt: z.date(),
    minAmount: z.coerce.number(),
    isDisabled: z.boolean(),
});

interface props {
    toggleDrawer: () => void;
}

const CouponForm = ({ toggleDrawer }: props) => {
    const router = useRouter();
    const { actionData } = useActionData();
    const selectedCoupon = actionData as Coupon | null;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: selectedCoupon?.code ?? "",
            discountType: selectedCoupon?.discountType,
            discountValue: selectedCoupon?.discountValue,
            expiresAt: selectedCoupon
                ? new Date(selectedCoupon.expiresAt)
                : undefined,
            minAmount: selectedCoupon?.minAmount,
            isDisabled: selectedCoupon?.isDisabled ?? false,
        },
    });

    const createCoupon = async (values: z.infer<typeof formSchema>) => {
        try {
            const { data } = await axios.post("/api/coupons", values);
            notifySuccess(data.message);
            toggleDrawer();
            router.refresh();
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };

    const updateCoupon = async (values: z.infer<typeof formSchema>) => {
        try {
            const couponId = selectedCoupon?._id;
            const { data } = await axios.put(
                `/api/coupons/${couponId}`,
                values
            );
            notifySuccess(data.message);
            toggleDrawer();
            router.refresh();
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };

    const isEditMode = selectedCoupon !== null;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(
                    isEditMode ? updateCoupon : createCoupon
                )}
                className="space-y-6"
            >
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Code <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="MYCOUPON50" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="discountType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Discount type{" "}
                                <span className="text-red-600">*</span>
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a discount type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {["fixed", "percentage"].map((type) => (
                                        <SelectItem
                                            key={type}
                                            value={type}
                                            className="capitalize"
                                        >
                                            <span className="capitalize">
                                                {type}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="discountValue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Discount value{" "}
                                <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="5" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="minAmount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Minimum amount{" "}
                                <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="5" {...field} />
                            </FormControl>
                            <FormDescription>
                                The minimum order total required to qualify for
                                this coupon.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="expiresAt"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>
                                Expiration Date{" "}
                                <span className="text-red-600">*</span>
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                dayjs(field.value).format(
                                                    "DD MMMM YYYY"
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date <= new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isDisabled"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Disable this coupon.</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button
                    className="w-40"
                    disabled={form.formState.isSubmitting}
                    type="submit"
                >
                    {form.formState.isSubmitting ? (
                        <LoadingSpinner />
                    ) : isEditMode ? (
                        "Update coupon"
                    ) : (
                        "Publish coupon"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default CouponForm;
