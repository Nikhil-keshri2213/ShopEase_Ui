export const API_URL = {
    GET_PRODUCTS:'/api/products',
    GET_PRODUCT:(id) =>`/api/products/${id}`,
    GET_CATEGORIES:'/api/category',
    GET_CATEGORY:(id) => `/api/category/${id}`,
}

export const API_BASE_URL = "http://localhost:8080";