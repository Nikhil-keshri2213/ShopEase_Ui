import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import  Breadcrumb  from "../../../components/Breadcrumb/Breadcrumb";

const BreadcrumbLink = [
  {title:'Shop',path:'/'},{title:"Women", path:"/women"},{title:"Top", path:"/top"}
]


export const ProductDetail = () => {
  const { product } = useLoaderData();
  const [image, setImage] = useState(product?.images[0]?.startsWith('http') ? product.images[0] : product?.thumbnail);

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
      <div className="w-[60%]">
        {/* Product Description */}
        <Breadcrumb links={BreadcrumbLink}/>
      </div>
    </div>
  );
};
export default ProductDetail