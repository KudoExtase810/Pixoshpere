"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn, notifyError, notifySuccess } from "@/lib/utils";
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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";
import wilayas from "@/data/wilayas.json";
import axios from "axios";

interface AccountFormProps {
    user: User;
}

const accountFormSchema = z.object({
    firstname: z.string().min(2).max(48),
    lastname: z.string().min(2).max(48),
    email: z.string().email().max(128),
    phone: z
        .string()
        .regex(/^[0-9]*$/, "Only nums plz")
        .length(10)
        .optional(),
    wilaya: z
        .string({
            required_error: "Please select a language.",
        })
        .optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm({ user }: AccountFormProps) {
    const [initialEmail, setInitialEmail] = useState(user.email);
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            phone: user.phone,
        },
    });

    const updateUser = async (values: AccountFormValues) => {
        if (initialEmail !== values.email) {
            return notifySuccess("Confirm your new email address");
        }
        const { data } = await axios.put(`/api/users/${user._id}`, values);
        notifySuccess(data.message);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(updateUser)}
                className="space-y-6"
            >
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input placeholder="Mohammed" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input placeholder="Ali" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="ali_mohammed@email.dz"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input
                                    type="tel"
                                    {...field}
                                    placeholder="0662126872"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="wilaya"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Wilaya</FormLabel>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "sm:w-[360px] justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? wilayas.find(
                                                      (wilaya) =>
                                                          wilaya.name ===
                                                          field.value
                                                  )?.name
                                                : "Select language"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="sm:w-[360px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search wilaya..." />
                                        <CommandEmpty>
                                            No wilaya found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            <ScrollArea className="h-72">
                                                {wilayas.map((wilaya) => (
                                                    <CommandItem
                                                        value={wilaya.name}
                                                        key={wilaya.code}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                "wilaya",
                                                                wilaya.name
                                                            );
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                wilaya.name ===
                                                                    field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {`${wilaya.code} - ${wilaya.name}`}
                                                    </CommandItem>
                                                ))}
                                            </ScrollArea>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <FormDescription>
                                This is the language that will be used in the
                                dashboard.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-[152px]"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? (
                        <LoadingSpinner />
                    ) : (
                        "Update details"
                    )}
                </Button>
            </form>
        </Form>
    );
}
