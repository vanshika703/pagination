import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination.js";

function App() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentpage] = useState(1);
  const [items, setItems] = useState([]);
  const totalItems = 100;
  const totalPages = totalItems / itemsPerPage;

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    try {
      const fetchedData = await axios.get(
        `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
          (currentPage - 1) * itemsPerPage
        }`
      );
      console.log(fetchedData.data.products);
      setItems(fetchedData.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(e.target.value);
    setCurrentpage(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentpage(currentPage - 1);
  };

  const handleNext = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) setCurrentpage(currentPage + 1);
  };

  const handleCurrentPage = (page) => {
    setCurrentpage(page);
  };

  return (
    <div className="App w-[100vw] min-h-[100vh] bg-[#ededed] flex flex-col justify-start items-center p-5 font-poppins">
      <h1 className="heading text-3xl text-[#73BEEF] font-medium p-2 m-2">
        PRODUCT INVENTORY
      </h1>
      <div className="flex justify-between sm:w-2/3">
        <Pagination
          className=""
          handleCurrentPage={handleCurrentPage}
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <label>
          Items per page:
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
      </div>
      <table className="sm:w-2/3 w-full bg-slate-50 p-2 m-2 text-[#3a3b3c]">
        <thead>
          <tr className="table-row text-white font-thin">
            <th className="p-2 font-medium border-2 border-[#ededed]">ID</th>
            <th className="p-2 font-medium border-2 border-[#ededed]">Name</th>
            <th className="p-2 font-medium border-2 border-[#ededed]">
              Category
            </th>
            <th className="p-2 font-medium border-2 border-[#ededed]">Price</th>
            <th className="p-2 font-medium border-2 border-[#ededed]">
              Rating
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className=" border-2 border-[#ededed]">
              <td className="p-2 border-2 border-[#ededed]">{item.id}</td>
              <td className="p-2 border-2 border-[#ededed]">{item.title}</td>
              <td className="p-2 border-2 border-[#ededed]">{item.category}</td>
              <td className="p-2 border-2 border-[#ededed] text-green-400">
                &#8377;{item.price}
              </td>
              <td className="p-2 border-2 border-[#ededed]">{item.rating}⭐</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        className=""
        handleCurrentPage={handleCurrentPage}
        handlePrev={handlePrev}
        handleNext={handleNext}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default App;
