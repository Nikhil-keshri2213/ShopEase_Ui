import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";

export const fileUploadAPI = async (file, fileName) => {
    const url = API_BASE_URL + `/api/file/uploadImageWithUrl`;
    
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        
        const response = await axios.post(url, formData, {
            headers: {
                ...getHeaders(),
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response?.data; // Returns { message, fileUrl, fileName }
    }
    catch (err) {
        console.error("File upload error:", err);
        throw new Error(err?.response?.data?.message || "File upload failed");
    }
}