import React, { useMemo } from "react";
import FilterIcon from "../../components/Common/FilterIcon";
import content from "../../data/content.json";
import { Categories } from "../../components/Filters/Categories";
import { PriceFilter } from "../../components/Filters/PriceFilter";
import { ColorFilter } from "../../components/Filters/ColorFilter";
import { SizeFilter } from "../../components/Filters/SizeFilter";
import { ProductCard } from "./ProductCard";

const categories = content?.categories;

export const ProductListPage = ({ categoryType }) => {
  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType);
  }, [categoryType]);

  const productListItems = useMemo(() => {
    return content?.products?.filter(
      (product) => product?.category_id === categoryContent?.id
    );
  }, [categoryContent]);

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
        {/* Price Filter */}
        <PriceFilter />
        <hr></hr>
        {/* Color Filter */}
        <ColorFilter colors={categoryContent?.meta_data?.colors} />
        <hr></hr>
        {/* Size Filter */}
        <SizeFilter sizes={categoryContent?.meta_data?.sizes} />
      </div>

      <div className="p-[20px]">
        <p className="text-black text-lg">{categoryContent?.description}</p>
        {/* Products */}

        <div className="pt-4 px-2 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
          {/* <ProductCard {...productListItems[0]}/> */}
          {productListItems?.map((item, index) => {
            return <ProductCard key={index} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};
