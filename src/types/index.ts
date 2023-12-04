// type User = {
//     _id: string;
//     createdAt: NativeDate,
//     updatedAt: NativeDate
//     email: string;
// };

// type Category = {
//     _id: string;
//     createdAt: NativeDate,
//     updatedAt: NativeDate
//     label: string;
// };

// type Product = {
//     _id: string;
//     createdAt: NativeDate;
//     updatedAt: NativeDate;
//     title: string;
//     slug: string;
//     price: number;
//     quantity: number;
//     priority: number;
//     images: {
//         publicId: string;
//         url: string;
//     }[];
//     description: string;
//     isHidden: boolean;
//     hideWhenOutOfStock: boolean;
//     salePrice?: number;
//     category: string | Category;
// };

// type Order = {
//     _id: string;
//     createdAt: NativeDate,
//     updatedAt: NativeDate
//     products: string[] | Product[];
//     user: string[] | User[];
// };

type Base = {
    _id: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
};

type User = Base & {
    email: string;
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

type Order<T1 = string, T2 = string> = Base & {
    products: T1[] | Product[];
    user: T2[] | User[];
};
