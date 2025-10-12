import React from "react";
import SectionHeading from "./SectionHeading/SectionHeading";
import Card from "../Card/Card";

import jeans from "../../assets/img/jeans.jpg";
import shirts from "../../assets/img/shirts.jpg";
import tshirt from "../../assets/img/tshirts.jpeg";
import dresses from "../../assets/img/dresses.jpg";
import joggers from "../../assets/img/joggers.jpg";
import kurtis from "../../assets/img/kurtis.jpg";

import Carousel from "react-multi-carousel";
import { responsive } from "../../Utils/Section.constants";
import "./NewArrival.css";

const items = [
  { title: "Jeans", imagePath: jeans },
  { title: "Shirt", imagePath: shirts },
  { title: "T-Shirt", imagePath: tshirt },
  { title: "Dresses", imagePath: dresses },
  { title: "Joggers", imagePath: joggers },
  { title: "Kurtis", imagePath: kurtis },
];

function NewArrival() {
  return (
    <div className="p-4 shadow-lg rounded-2xl border-white/20 border-2 bg-white/40">
      <SectionHeading title={"New Arrivals"} />
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={false}
        showDots={false}
        infinite={true}
        itemClass="px-3"
        className="mt-6">

        {items.map((item, index) => (
          <div
            key={item?.title + index}
            className="bg-black rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src={item.imagePath}
              alt={item.title}
              className="w-full h-64 object-cover"  // FIXED SIZE IMAGES
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default NewArrival;
