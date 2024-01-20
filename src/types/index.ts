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
    salePrice: number;
    category: Category;
    sales: number;
};

type Order = Base & {
    products: Product[];
    status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
    customer: User;
    total: number;
    appliedCoupon: string;
    details: {
        streetAddress: string;
        city: string;
        zipCode: string;
    };
    discount: number;
};

type Coupon = Base & {
    code: string;
    expiresAt: Date;
    discountType: "fixed" | "percentage";
    discountValue: number;
    isDisabled: boolean;
    minAmount: number;
    timesApplied: number;
};

type Message = Base & {
    sender: {
        email: string;
        firstName: string;
        lastName: string;
    };
    subject: string;
    content: string;
};
