import React from "react";

const Pagination = ({
  handlePrev,
  handleNext,
  currentPage,
  handleCurrentPage,
  totalPages,
}) => {
  let pageNumbers = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= totalPages) pageNumbers.push(i);
  }

  return (
    <div>
      <button
        className="px-2  border-[1px] border-[#161a1c] font-medium bg-[#6995E3] text-white"
        onClick={() => handleCurrentPage(1)}
      >
        &lt;&lt;
      </button>
      <button
        className="px-2  border-[1px] border-[#3080b5] font-medium bg-[#6FAFEA] text-white"
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
                ? "bg-[#6FAFEA] text-white"
                : " bg-white text-[#3a3b3c]"
            }`}
            onClick={() => handleCurrentPage(item)}
          >
            {item}
          </button>
        );
      })}
      <button
        className="px-2  border-[1px] border-[#3080b5] font-medium bg-[#6FAFEA] text-white"
        onClick={handleNext}
      >
        &gt;
      </button>
      <button
        className="px-2  border-[1px] border-[#3080b5] font-medium bg-[#6995E3] text-white"
        onClick={() => handleCurrentPage(totalPages)}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
