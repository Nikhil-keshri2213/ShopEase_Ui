import SectionHeading from "./SectionHeading/SectionHeading";
import Card from "../Card/Card";
import { useState } from "react";

function Category({ title, data }) {

 const titleLink = title.toLowerCase().includes('women') ? '/womens' : '/mens';

  return (
    <div className="mb-16 px-6 shadow-lg rounded-2xl border-white/20 border-2 p-6 bg-white/40">
      {/* Section Heading */}
      <SectionHeading title={title} />

      {/* Cards Container */}
      <div className="mt-8 flex flex-wrap gap-6 justify-start overflow-x-auto snap-x snap-mandatory">
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
