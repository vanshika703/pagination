import React from "react";

const Pagination = ({
  handlePrev,
  handleNext,
  currentPage,
  handleCurrentPage,
  totalPages,
}) => {
  let pageNumbers = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button
        className="px-2  border-[1px] border-[#73BEEF] font-medium bg-[#73BEEF] text-white"
        onClick={handlePrev}
      >
        &lt;
      </button>
      {pageNumbers.map((item) => {
        console.log(item);
        return (
          <button
            key={item}
            className={`px-2  border-[1px] border-[#73BEEF] font-medium  ${
              item === currentPage
                ? "bg-[#73BEEF] text-white"
                : " bg-white text-[#3a3b3c]"
            }`}
            onClick={() => handleCurrentPage(item)}
          >
            {item}
          </button>
        );
      })}
      <button
        className="px-2  border-[1px] border-[#73BEEF] font-medium bg-[#73BEEF] text-white"
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
