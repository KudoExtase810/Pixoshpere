// eslint-disable @next/next/no-img-element

import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PreviousImagesProps {
    images: Product["images"];
    setImages: React.Dispatch<React.SetStateAction<Product["images"]>>;
    loadingImgCount: number;
}

const SortableImages = ({
    images,
    setImages,
    loadingImgCount,
}: PreviousImagesProps) => {
    const removeImage = (imgUrl: string) => {
        const filteredImages = images.filter((image) => image.url !== imgUrl);
        setImages(filteredImages);
    };

    const onSortEnd = (oldIndex: number, newIndex: number) => {
        setImages((images) => arrayMoveImmutable(images, oldIndex, newIndex));
    };

    return (
        <>
            <SortableList
                allowDrag={images.length > 1 && loadingImgCount === 0}
                as="ol"
                onSortEnd={onSortEnd}
                className="flex flex-wrap gap-3"
            >
                {images.map((image, idx) => (
                    <li key={image.url} className="relative">
                        <button
                            className="absolute text-red-500 hover:text-red-600 top-2 right-2"
                            onClick={() => removeImage(image.url)}
                        >
                            <X size={16} strokeWidth={2.5} />
                            <span className="sr-only">Remove image</span>
                        </button>
                        <SortableItem>
                            {/* We use regular img tag intead of Next's to avoid any unexpected bugs with the sorting package (if any exist) */}
                            <img
                                className="h-[105px] w-[105px] max-md:h-24 max-md:w-24 rounded-sm select-none pointer-events-none"
                                alt={`Img ${idx}`}
                                src={image.url}
                            />
                        </SortableItem>
                    </li>
                ))}
                {/* If there are any imgs uploading, we add them as loading skeletons */}
                {[...new Array(loadingImgCount)].map((_img, idx) => (
                    <li key={idx}>
                        <Skeleton className="h-[105px] w-[105px] max-md:h-24 max-md:w-24 rounded-sm" />{" "}
                    </li>
                ))}
            </SortableList>
            {images.length > 1 && (
                <ul className="flex flex-col gap-1 text-sm text-cyan-500">
                    <li>
                        <p>You can drag the images to re-arrange them.</p>
                    </li>
                    <li>
                        <p>
                            The 1st image will appear as the product's preview
                            image.
                        </p>
                    </li>
                </ul>
            )}
        </>
    );
};

export default SortableImages;
