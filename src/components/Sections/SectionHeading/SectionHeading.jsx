import React from "react";

const SectionHeading = ({ title }) => {
  return (
    <div className="flex items-center px-6 p-2 sm:px-6 mb-4 rounded-lg border-black border-1 bg-black/70">
      <div className="w-2 h-8 bg-white/60 rounded mr-3"></div>
      <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
        {title}
      </p>
    </div>
  );
};

SectionHeading.defaultProps = {};

export default SectionHeading;
