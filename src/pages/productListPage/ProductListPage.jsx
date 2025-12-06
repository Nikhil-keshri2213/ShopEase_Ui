import React, { useEffect, useMemo, useState } from "react";
import FilterIcon from "../../components/Common/FilterIcon.jsx";
import content from "../../data/content.json";
import { Categories } from "../../components/Filters/Categories.jsx";
import { PriceFilter } from "../../components/Filters/PriceFilter.jsx";
import { ColorFilter } from "../../components/Filters/ColorFilter.jsx";
import { SizeFilter } from "../../components/Filters/SizeFilter.jsx";
import { ProductCard } from "./ProductCard.jsx";
import { getAllProducts } from "../../api/fetchProducts.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common.js";

const categories = content?.categories;

export const ProductListPage = ({ categoryType }) => {
  const categoryData = useSelector((state) => state?.categoryState?.categories);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType);
  }, [categoryType]);

  const productListItems = useMemo(() => {
    return content?.products?.filter(
      (product) => product?.category_id === categoryContent?.id
    );
  }, [categoryContent]);

  const category = useMemo(() => {
    return categoryData?.find(
      (element) => element?.code?.toLowerCase() === categoryType?.toLowerCase()
    );
  }, [categoryData, categoryType]);

  
  useEffect(()=>{
    if (!category?.id) {
      console.warn("⚠️ Skipping API: categoryId is undefined");
    }

    dispatch(setLoading(true));

    getAllProducts(category?.id, category?.categoryType).then(res => {
      setProducts(res);
    }).catch(err =>{
      console.log("API error:", err)
    }).finally(()=>{
      dispatch(setLoading(false));
    })
  },[category?.id, category?.categoryType, dispatch]);


  return (
    <div className="flex">
      <div className="w-[20%] p-[20px] border rounded-lg m-[20px]">
        
        <div className="flex justify-between">
          <p className="text-[16px] text-gray-600">Filter</p>
          <FilterIcon />
        </div>
        
        <div>
          <p className="text-[16px] text-black mt-5">Categories</p>
          <Categories types={categoryContent?.types} />
        </div>
        <hr></hr>
        
        <PriceFilter />
        <hr></hr>
        
        <ColorFilter colors={categoryContent?.meta_data?.colors} />
        <hr></hr>
        
        <SizeFilter sizes={categoryContent?.meta_data?.sizes} />
      </div>

      <div className="p-[20px]">
        <p className="text-black text-lg">{category?.description}</p>

        <div className="pt-4 px-2 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
          {/* <ProductCard {...productListItems[0]}/> */}
          {products?.map((item, index) => {
            return (
              <ProductCard
                key={item?.id + " " + index}
                {...item}
                title={item?.name}
                slug={item?.slug}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
