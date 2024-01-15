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
    total: number;
    appliedCoupon: string;
    details: {
        email: string;
        firstName: string;
        lastName: string;
        streetAddress: string;
        city: string;
        zipCode: string;
        phone: string;
    };
};

type Coupon = Base & {
    code: string;
    expiresAt: Date;
    discountType: "fixed" | "percentage";
    discountValue: number;
    isDisabled: boolean;
    minAmount: number;
    timesApplied: number;
    allowedProducts?: string[];
    allowedCategories: string[];
};

type Message = Base & {
    sender: {
        email: string;
        fullName: string;
    };
    subject: string;
    message: string;
};
