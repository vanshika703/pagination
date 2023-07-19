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
    <div className="App">
      <input
        type="number"
        placeholder="Items per Page..."
        onChange={handleItemsPerPageChange}
        value={itemsPerPage}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrev}>Prev</button> 
        <p>{currentPage}</p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
