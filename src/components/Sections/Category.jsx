import SectionHeading from "./SectionHeading/SectionHeading.jsx";
import Card from "../Card/Card.jsx";
import { useState } from "react";

function Category({ title, data }) {

 const titleLink = title.toLowerCase().includes('women') ? '/womens' : '/mens';

  return (
    <div className="mb-16 px-6 shadow-xl rounded-2xl border-black/10 border-2 p-2 bg-white/80">
      {/* Section Heading */}
      <SectionHeading title={title} />

      {/* Cards Container */}
      <div className="mt-6 mb-2 flex flex-wrap gap-6 justify-center overflow-x-auto snap-x snap-mandatory">
        {data?.map((item, index) => (
          <div key={index} className="snap-start">
            <Card
              title={item?.title}
              description={item?.description}
              imagePath={item?.image}
              actionArrow={true}
              titleLinks = {titleLink}
              height="280px"
              width="220px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
