import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentpage] = useState(1);
  const [items, setItems] = useState([]);
  const totalItems = 100;

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

  return (
    <div className="App w-[100vw] min-h-[100vh] bg-[#F8EEFF] flex flex-col justify-start items-center p-5">
      <h1 className="text-2xl text-[#dba6f5] font-semibold">Pagination in React</h1>
      <input
        type="number"
        placeholder="Enter number of items per page"
        onChange={handleItemsPerPageChange}
        //value={itemsPerPage}
        className="w-1/4 bg-[#F8EEFF] border-b-2 border-[#EDC8FF] p-2 m-2 focus:outline-none"
      />
      <table className="w-1/3 bg-slate-50 p-2 m-2">
        <thead>
          <tr className="bg-[#EDC8FF]">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className=" border-b-2 border-[#EDC8FF]">
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-20 justify-around p-2 m-2 text-[#dba6f5] font-semibold">
        <button onClick={handlePrev}>&lt; </button>
        <p>{currentPage}</p>
        <button onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
}

export default App;
