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
        "https://dummyjson.com/products?limit=5&skip=22"
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
        {items.map((item, i) => (
          <tr key={i}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
