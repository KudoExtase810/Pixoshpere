type Base = {
    _id: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
};

type User = Base & {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isVerified: boolean;
    isAdmin: boolean;
};

type Category = Base & {
    label: string;
    productCount?: number;
};

type Product = Base & {
    title: string;
    slug: string;
    price: number;
    quantity: number;
    priority: number;
    images: {
        publicId: string;
        url: string;
    }[];
    description: string;
    isHidden: boolean;
    hideWhenOutOfStock: boolean;
    salePrice?: number;
    category: Category;
    sales: number;
};

type Order = Base & {
    products: Product[];
    status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
    paymentMethod: string;
    customer: User;
};
