import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import  Breadcrumb  from "../../../components/Breadcrumb/Breadcrumb";
import content from '../../../data/content.json'
import Rating from "../../../components/Rating/rating";
import {SizeFilter} from '../../../components/Filters/SizeFilter'
import ProductColors from "./ProductColors";
import {CartIcon} from '../../../components/Common/CartIcon'
import SvgCreditCard from '../../../components/Common/SvgCreditCard'
import SvgCloth from '../../../components/Common/SvgCloth'
import SvgShipping from '../../../components/Common/SvgShipping'
import SvgReturn from '../../../components/Common/SvgReturn'
import SectionHeading from "../../../components/Sections/SectionHeading/SectionHeading";
import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import { getAllProducts } from "../../../api/fetchProducts";
import { addItemToCartAction } from "../../../store/actions/cartAction";

//const categories = content?.categories;

const extraSections = [
  {
    icon:<SvgCreditCard/>,
    label: 'Secure Payments'
  },
  {
    icon:<SvgCloth />,
    label:'Size & Fit'
  },
  {
    icon:<SvgShipping />,
    label:'Free Shipping'
  },
  {
    icon:<SvgReturn />,
    label:'Return Policy is Available'
  }
]

export const ProductDetail = () => {
  const { product } = useLoaderData();
  const [image, setImage] = useState();
  const [BreadcrumbLink, setBreadcrumbLink] = useState([]);
  const dispatch = useDispatch();
  const [similarProducts, setSimilarProducts] = useState([]);
  const categories = useSelector((state) => state?.categoryState?.categories);
  const [selectSize, setSelectSize] = useState();
  const [error, setError] = useState('');


  // const cartItems = useSelector((state) => state.cartState?.cart);
  
  // const similarProducts = useMemo(()=>{
  //   return content?.products?.filter((item)=> item?.type_id === product?.type_id && item?.id !== product?.id)
  // },[product]);
  
  const productCategory = useMemo(()=>{
    return categories?.find((category)=> category?.id === product?.categoryId);
  },[product,categories]);

  useEffect(()=>{
    getAllProducts(product?.categoryId, product?.categoryTypeId).then(res=>{
      const excludedproduct = res?.filter((item)=> item?.id !== product?.id);
      setSimilarProducts(excludedproduct)
    }).catch(()=>[

    ])
  },[product?.categoryId, product?.categoryTypeId])

  useEffect(()=>{
    setImage(product?.thumbnail)
    setBreadcrumbLink([]);
    const arrayLinks = [{title:'Shop',path:'/'},{
      title:productCategory?.name,
      path:productCategory?.path
    }];
    
    const productType = productCategory?.categoryTypes?.find((item)=> item?.id === product?.categoryTypeId)
    
    if(productType){
      arrayLinks?.push({
      title:productType?.name,
      path:productType?.name
    })}

    // const productType = productCategory?.types?.find((item)=>item?.type_id === product?.type_id);
    // if(productType){
    //   arrayLinks?.push({
    //   title:productType?.name,
    //   path:productType?.name
    // })}

    setBreadcrumbLink(arrayLinks);
  },[productCategory, product])

  const addItemToCart = useCallback(()=>{
    console.log("Size: ",selectSize); 
    if (!selectSize) {
      setError('Please select one size.')
    }else{
      const selectedVariant = product?.variants?.filter((variant)=>variant.size === selectSize);
      
      console.log("Selected: ", selectedVariant);

      if (selectedVariant?.[0].stockQuantity > 0) {
        dispatch(addItemToCartAction({
          productId:product?.id,
          thumbnail:product?.thumbnail,
          name:product?.name,
          brand:product?.brand,
          variant:selectedVariant,
          quantity: 1,
          subTotal: product?.price,
          price:product?.price,
        }))
      }else{
        setError('Sorry! Out of Stock.')
      }
    }
  },[selectSize, dispatch, product]);

  useEffect(()=>{
    if(setSelectSize){
      setError('');
    }
  },[selectSize])

  const colors = useMemo(()=>{
    const colorSet = _.uniq(_.map(product?.variants, 'color'));
    return colorSet
  },[product])

  const sizes = useMemo(()=>{
    const sizeSet = _.uniq(_.map(product?.variants, 'size'));
    return sizeSet
  },[product])

  return (
    <>
    <div className="flex flex-col md:flex-row p-10">
      <div className="w-[100%] lg:w-[50%] md:w-[40%]">
        
        {/* Image */}
        <div className="flex flex-col md:flex-row">
          <div className="w-[100%] md:w-[30%] justify-center h-[40px] md:h-[420px]">
            {/* Stack Image */}
            <div className="flex md:flex-col flex-row justify-center h-full">
              {
                  product?.productResource?.map((item, index) => (
                    <button key={index} onClick={()=>setImage(item?.url)} className="border rounded-lg w-fit p-2 mb-2">
                    <img src={item?.url}
                        className="h-[48px] w-[48px] object-center"
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
              alt={product?.name}
              className="h-full w-500 max-h-[520px] border rounded-lg cursor-pointer object-center"
            />
          </div>

        </div>
      </div>

      <div className="w-[60%] px-10">
        {/* Product Description */}
        <Breadcrumb links={BreadcrumbLink}/>
        
        <p className="text-3xl pt-3 pb-4">{product?.name}</p>
        
        <Rating rating={product?.rating}/>
        
        {/* Price Tag */}
        <p className="text-xl bold pt-2 px-2">₹ {product?.price}.00</p>
        
        <div className="flex flex-col pt-3">
          <div className="flex gap-2">
            <p className="text-sm bold px-2">Select Size</p>
            <Link className="text-sm text-gray-500 hover:text-gray-900" to={'https://en.wikipedia.org/wiki/Clothing_sizes'} target="blank">{'Size Guide ->'}</Link>
          </div>
        </div>
        
        <div className="mt-3">
          <SizeFilter onChange={(values)=>setSelectSize(values?.[0])} sizes={sizes} hideTitle={true} multi={false}/>
        </div>
        
        <div>
          <p className="text-sm px-2">Colors Available</p>
          <ProductColors colors={colors}/>
        </div>
        
        <div className="flex pt-5 px-2 pb-4">
          <button onClick={addItemToCart} className="flex items-center gap-2 bg-black text-white rounded-lg px-4 py-2"><CartIcon bgColor="black" />Add to cart</button>
        </div>
        
              {error && <p className="text-base text-red-600 px-2">{error}</p> }
        <hr />
        
        <div className="grid grid-cols-2 pt-4 gap-4 text-gray-600">
          {
            extraSections?.map((section, index)=>(
            <div className="flex items-center" key={index}>
                {section?.icon}
                <p className="px-3">{section?.label}</p>
              </div>
            ))
          }
        </div>

      </div>
    </div>

    {/* Product Description */}
    <SectionHeading title={"Product Description"}/>
    <div className="md:w-[50%] w-full px-2 pb-5">
      <p className="px-14">{product?.description}</p>
    </div>

    {/* Similar Product */}
    <SectionHeading title={"Similar Product"}/>
    <div className="flex px-10">
      <div className="pt-4 px-12 pb-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
        {/* <ProductCard {...productListItems[0]}/> */}
        {
          similarProducts?.map((item, index) => {
          return <ProductCard key={index} {...item} />;})
        }
        {!similarProducts?.length && <p>More Products Comming soon.</p> }
      </div>
    </div>
    </>
  );
};
export default ProductDetail