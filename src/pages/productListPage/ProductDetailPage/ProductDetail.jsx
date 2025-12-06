import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Rating from "../../../components/Rating/rating";
import { SizeFilter } from "../../../components/Filters/SizeFilter";
import ProductColors from "./ProductColors";
import { CartIcon } from "../../../components/Common/CartIcon";
import SvgCreditCard from "../../../components/Common/SvgCreditCard";
import SvgCloth from "../../../components/Common/SvgCloth";
import SvgShipping from "../../../components/Common/SvgShipping";
import SvgReturn from "../../../components/Common/SvgReturn";
import SectionHeading from "../../../components/Sections/SectionHeading/SectionHeading";
import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getAllProducts } from "../../../api/fetchProducts";
import { addItemToCartAction } from "../../../store/actions/cartAction";

const extraSections = [
  { icon: <SvgCreditCard />, label: "Secure Payments" },
  { icon: <SvgCloth />, label: "Size & Fit" },
  { icon: <SvgShipping />, label: "Free Shipping" },
  { icon: <SvgReturn />, label: "Return Policy is Available" },
];

export const ProductDetail = () => {
  const { product } = useLoaderData();
  const [image, setImage] = useState();
  const [BreadcrumbLink, setBreadcrumbLink] = useState([]);
  const dispatch = useDispatch();
  const [similarProducts, setSimilarProducts] = useState([]);
  const categories = useSelector((state) => state?.categoryState?.categories);
  const [selectSize, setSelectSize] = useState();
  const [error, setError] = useState("");

  const productCategory = useMemo(() => {
    return categories?.find((category) => category?.id === product?.categoryId);
  }, [product, categories]);

  useEffect(() => {
    getAllProducts(product?.categoryId, product?.categoryTypeId)
      .then((res) => {
        const excludedproduct = res?.filter((item) => item?.id !== product?.id);
        setSimilarProducts(excludedproduct);
      })
      .catch(() => []);
  }, [product?.categoryId, product?.categoryTypeId]);

  useEffect(() => {
    setImage(product?.thumbnail);
    setBreadcrumbLink([]);
    const arrayLinks = [
      { title: "Shop", path: "/" },
      { title: productCategory?.name, path: productCategory?.path },
    ];

    const productType = productCategory?.categoryTypes?.find(
      (item) => item?.id === product?.categoryTypeId
    );

    if (productType) {
      arrayLinks?.push({
        title: productType?.name,
        path: productType?.name,
      });
    }

    setBreadcrumbLink(arrayLinks);
  }, [productCategory, product]);

  const addItemToCart = useCallback(() => {
    if (!selectSize) {
      setError("Please select one size.");
    } else {
      const selectedVariant = product?.variants?.filter(
        (variant) => variant.size === selectSize
      );

      if (selectedVariant?.[0].stockQuantity > 0) {
        dispatch(
          addItemToCartAction({
            productId: product?.id,
            thumbnail: product?.thumbnail,
            name: product?.name,
            brand: product?.brand,
            variant: selectedVariant,
            quantity: 1,
            subTotal: product?.price,
            price: product?.price,
          })
        );
      } else {
        setError("Sorry! Out of Stock.");
      }
    }
  }, [selectSize, dispatch, product]);

  useEffect(() => {
    if (selectSize) setError("");
  }, [selectSize]);

  const colors = useMemo(() => {
    return _.uniq(_.map(product?.variants, "color"));
  }, [product]);

  const sizes = useMemo(() => {
    return _.uniq(_.map(product?.variants, "size"));
  }, [product]);

  return (
    <>
      <div className="flex flex-col md:flex-row p-8 md:p-10">
        {/* Left Side - Images */}
        <div className="w-full md:w-[45%] flex flex-col items-center">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[25%] flex md:flex-col flex-row justify-center md:items-start gap-3 md:gap-2 mb-4 md:mb-0">
              {product?.productResource?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setImage(item?.url)}
                  className="border rounded-lg w-fit p-2 hover:shadow-md transition-all"
                >
                  <img
                    src={item?.url}
                    className="h-[48px] w-[48px] object-center"
                    alt={"sample-" + index}
                  />
                </button>
              ))}
            </div>

            <div className="w-full md:w-[75%] flex justify-center">
              <img
                src={image}
                alt={product?.name}
                className="max-h-[520px] w-auto border rounded-xl object-contain shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="w-full md:w-[55%] mt-8 md:mt-0 md:px-10">
          <Breadcrumb links={BreadcrumbLink} />

          <h2 className="text-3xl font-semibold pt-3 pb-4">{product?.name}</h2>

          <Rating rating={product?.rating} />

          <p className="text-2xl font-semibold pt-4 px-2 text-gray-800">
            ₹ {product?.price}.00
          </p>

          {/* Size Section */}
          <div className="flex flex-col pt-5 space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold px-2">Select Size</p>
              <Link
                className="text-sm text-gray-500 hover:text-gray-900"
                to={"https://en.wikipedia.org/wiki/Clothing_sizes"}
                target="blank"
              >
                Size Guide →
              </Link>
            </div>
            <SizeFilter
              onChange={(values) => setSelectSize(values?.[0])}
              sizes={sizes}
              hideTitle={true}
              multi={false}
            />
          </div>

          {/* Colors */}
          <div className="mt-5">
            <p className="text-sm font-semibold px-2 mb-2">Colors Available</p>
            <ProductColors colors={colors} />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-8 px-2 pb-6">
            <button
              onClick={addItemToCart}
              className="flex items-center justify-center gap-2 bg-black text-white rounded-lg px-6 py-3 font-medium hover:bg-gray-900 transition-all w-full md:w-auto"
            >
              <CartIcon bgColor="black" /> Add to Cart
            </button>

            <button
              onClick={addItemToCart}
              className="flex items-center justify-center gap-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg px-6 py-3 font-medium transition-all w-full md:w-auto"
            >
              <span className="text-lg">₹</span> Buy Now
            </button>
          </div>

          {error && (
            <p className="text-base text-red-600 px-2 pt-1">{error}</p>
          )}

          <hr className="my-4" />

          {/* Info Icons */}
          <div className="grid grid-cols-2 pt-4 gap-4 text-gray-600">
            {extraSections?.map((section, index) => (
              <div className="flex items-center" key={index}>
                {section?.icon}
                <p className="px-3">{section?.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Description */}
      <SectionHeading title={"Product Description"} />
      <div className="md:w-[60%] w-full px-6 pb-5">
        <p className="leading-relaxed text-gray-700">{product?.description}</p>
      </div>

      {/* Similar Product */}
      <SectionHeading title={"Similar Product"} />
      <div className="flex px-10">
        <div className="pt-4 px-12 pb-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
          {similarProducts?.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
          {!similarProducts?.length && (
            <p>More Products Coming Soon.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
