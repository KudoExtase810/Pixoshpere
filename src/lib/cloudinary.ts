import axios, { isAxiosError } from "axios";

export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
    const uploadURL = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const { data } = await axios.post(uploadURL, formData);

    return {
        publicId: data?.public_id as string,
        url: data?.secure_url as string,
    };
};
