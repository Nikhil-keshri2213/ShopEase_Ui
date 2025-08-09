import React, { useEffect, useMemo, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import  Breadcrumb  from "../../../components/Breadcrumb/Breadcrumb";
import content from '../../../data/content.json'
import Rating from "../../../components/Rating/rating";
import {SizeFilter} from '../../../components/Filters/SizeFilter'


const categories = content?.categories;

export const ProductDetail = () => {
  const { product } = useLoaderData();
  const [image, setImage] = useState(product?.images[0]?.startsWith('http') ? product.images[0] : product?.thumbnail);
  const [BreadcrumbLink, setBreadcrumbLink] = useState([]);

  const productCategory = useMemo(()=>{
    return categories?.find((category)=> category?.id === product?.category_id);
  },[product]);

  useEffect(()=>{
    setBreadcrumbLink([]);
    const arrayLinks = [{title:'Shop',path:'/'},{
      title:productCategory?.name,
      path:productCategory?.path
    }];
    
    const productType = productCategory?.types?.find((item)=>item?.type_id === product?.type_id);
    console.log("Product Type",productType, productCategory);
    
    if(productType){
      arrayLinks?.push({
      title:productType?.name,
      path:productType?.name
    })}
    setBreadcrumbLink(arrayLinks);
  },[productCategory, product])

  return (
    <div className="flex flex-col md:flex-row p-10">
      <div className="w-[100%] lg:w-[50%] md:w-[40%]">
        {/* Image */}
        <div className="flex flex-col md:flex-row">
          <div className="w-[100%] md:w-[30%] justify-center h-[40px] md:h-[420px]">
            {/* Stack Image */}
            <div className="flex md:flex-col flex-row justify-center h-full">
              {
                product?.images[0]?.startsWith('http') && product?.images?.map((m, index) => (
                    <button key={index} onClick={()=>setImage(m)} className="border rounded-lg w-fit p-2 mb-2">
                    <img src={m}
                        className="h-[48px] w-[48px]"
                        alt={"sample-" + index}
                    />
                    </button>
                ))
              }
            </div>
          </div>
          <div className="w-full md:w-[80%] flex justify-center md:pt-0 pt-10">
            <img
              src={image}
              alt={product?.title}
              className="h-full w-full max-h-[520px] border rounded-lg cursor-pointer object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-[60%] px-10">
        {/* Product Description */}
        <Breadcrumb links={BreadcrumbLink}/>
        <p className="text-3xl pt-3 pb-3">{product?.title}</p>
        <Rating rating={product?.rating}/> 
        <div className="flex flex-col pt-3">
          <div className="flex gap-2">
            <p className="text-sm bold">Select Size</p>
            <Link className="text-sm text-gray-500 hover:text-gray-900">{'Size Guide ->'}</Link>
            <SizeFilter sizes={product?.size}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail