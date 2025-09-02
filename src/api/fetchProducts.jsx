import axios from "axios";
import { API_BASE_URL, API_URL } from "./constant"


export const getAllProducts = async (id, typeId) => {
    const url = API_BASE_URL + API_URL.GET_PRODUCTS;

    const params = {};
    if (id) params.categoryId = id;
    if (typeId) params.categoryTypeId = typeId;

    try {
        const result = await axios.get(url, { params });
        return result?.data;
    } catch (err) {
        console.error(err);
    }
};


export const getProductBySlug = async (slug)=>{
    const url = API_BASE_URL + API_URL.GET_PRODUCTS + `?slug=${slug}`;
    try{
        const result = await axios(url,{
            method:"GET",
        });
        return result?.data?.[0];
    }
    catch(err){
        console.error(err);
    }
}