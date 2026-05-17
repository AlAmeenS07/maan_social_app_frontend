import axios from "axios";
import { commonErrorHandler } from "../utils/commonErrorHandler";
import { uploadImageUrlApi } from "../api/user/media.api";

export const uploadImageToS3 = async (file: File) => {
    try {
        // 1. get signed url
        const res = await uploadImageUrlApi(file.name, file.type);

        const { uploadUrl , key } = res.data

        // 2. upload image
        await axios.put(
            uploadUrl,
            file,
            {
                headers: {
                    "Content-Type":
                        file.type,
                },
            }
        );

        // 3. return s3 key
        return key;

    } catch (error) {
        commonErrorHandler(error)
    }
};