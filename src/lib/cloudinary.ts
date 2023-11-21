import axios from "axios";

export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET!;
    const uploadURL = process.env.CLOUDINARY_UPLOAD_URL!;

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const { data } = await axios.post(uploadURL);

    return { publicId: data?.public_id, url: data?.secure_url };
};
