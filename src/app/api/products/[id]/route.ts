import connectDB from "@/lib/connectdb";
import Product from "@/models/product";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const newProductData: Product = await request.json();

        await connectDB();
        const product = await Product.findByIdAndUpdate(
            params.id,
            newProductData,
            { runValidators: true }
        );

        if (!product) {
            return Response.json(
                { message: "Product not found." },
                { status: 404 }
            );
        }

        return Response.json(
            { message: "Product updated with success." },
            { status: 200 }
        );
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const product = await Product.findByIdAndDelete(params.id);

        if (!product) {
            return Response.json(
                { message: "Product not found." },
                { status: 404 }
            );
        }

        return Response.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
