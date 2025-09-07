import React, { useState, useCallback, useEffect } from "react";

export const SizeFilter = ({ sizes, hideTitle = false, multi = true, onChange }) => {
  const [appliedSize, setAppliedSize] = useState([]);

  const onClickDiv = useCallback(
    (item) => {
      setAppliedSize((prev) => {
        if (prev.includes(item)) {
          return prev.filter((size) => size !== item);
        } else {
          return multi ? [...prev, item] : [item];
        }
      });
    },
    [multi]
  );

  useEffect(() => {
    onChange && onChange(appliedSize);
  }, [appliedSize, onChange]);

  return (
    <div className={`flex flex-col ${hideTitle ? "" : "mb-4"}`}>
      {!hideTitle && (
        <p className="text-[16px] text-black mt-5 mb-5">Sizes</p>
      )}
      <div className="flex flex-wrap p-2">
        {sizes?.map((item) => (
          <div key={item} className="flex flex-col mr-2">
            <div
              className={`w-12 h-8 border rounded-lg mr-4 mb-2 cursor-pointer hover:scale-110 text-center flex items-center justify-center ${
                appliedSize.includes(item)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-500 border-black"
              }`}
              onClick={() => onClickDiv(item)}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default SizeFilter;