import { getToken } from "../utils/jwt-helper.js";

export const API_URL = {
    GET_PRODUCTS:'/api/products',
    GET_PRODUCT:(id) =>`/api/products/${id}`,
    GET_CATEGORIES:'/api/category',
    GET_CATEGORY:(id) => `/api/category/${id}`,
}

export const API_BASE_URL = "https://shopease-backend-ikca.onrender.com";

export const getHeaders = () =>{
    return{
        'Authorization':`Bearer ${getToken()}`
    }
}