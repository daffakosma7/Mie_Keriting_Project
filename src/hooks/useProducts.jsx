import { useEffect, useState } from "react";
import axios from "axios";

export default function useProducts(query) {
  const [products, setProducts] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = query
          ? `${API_BASE_URL}/menus?category=${query}`
          : `${API_BASE_URL}/menus`;
        const response = await axios.get(url);
        setProducts(response.data.data.menus);
      } catch (error) {
        console.log("Error when fetching", error);
      }
    };

    fetchProducts();
  }, [query]);

  return products;
}
