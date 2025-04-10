import { createContext, useContext, useState } from "react";

// Membuat CartDataContext gabungan
const CartDataContext = createContext();

// CartDataProvider untuk mengelola status cart dan data terkait cart
export function CartDataProvider({ children }) {
  // Status cart
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState({
    customer: "",
    items: [], // List of items in the cart
    total: 0, // Total price of the cart
  });

  // Fungsi untuk toggle cart
  const toggleCart = () => setIsCartOpen((prevState) => !prevState);

  // Fungsi untuk menambah item ke cart
  const addToCart = (item) => {
    setCartItems((prevState) => {
      const existedItem = prevState.items.find((data) => data.id === item.id);
  
      let updatedItems = [];
      let updatedTotal = 0;
  
      if (existedItem) {
        // If the item exists, increment the quantity and update the subtotal
        updatedItems = prevState.items.map((data) =>
          data.id === item.id
            ? {
                ...data,
                quantity: data.quantity + 1, // Increment the quantity
                subtotal: (data.quantity + 1) * data.price, // Update the subtotal
              }
            : data
        );
      } else {
        // If the item doesn't exist, add it to the cart with initial quantity of 1
        updatedItems = [
          ...prevState.items,
          { ...item, quantity: 1, subtotal: item.price }, // Default quantity and subtotal
        ];
      }
  
      // Recalculate the total
      updatedTotal = updatedItems.reduce((acc, curr) => acc + curr.subtotal, 0);
  
      return {
        ...prevState,
        items: updatedItems,
        total: updatedTotal,
      };
    });
  };

  // Fungsi untuk menghapus item dari cart
  const removeFromCart = (itemId) => {
    setCartItems((prevState) => {
      const updatedItems = prevState.items.filter((item) => item.id !== itemId);
      const updatedTotal = updatedItems.reduce(
        (acc, curr) => acc + curr.subtotal,
        0
      );

      return {
        ...prevState,
        items: updatedItems,
        total: updatedTotal, // Recalculate the total
      };
    });
  };

  // Fungsi untuk mengurangi jumlah item dalam cart
  const decreaseQuantity = (itemId) => {
    setCartItems((prevState) => {
      const updatedItems = prevState.items.map((item) => {
        if (item.id === itemId) {
          const updatedQuantity = item.quantity - 1;
          const updatedSubtotal = updatedQuantity * item.price;
  
          if (updatedQuantity === 0) {
            // Remove item from cart if quantity reaches 0
            return null;
          }
  
          return {
            ...item,
            quantity: updatedQuantity,
            subtotal: updatedSubtotal,
          };
        }
        return item;
      }).filter(item => item !== null); // Remove null items (if quantity was 0)
  
      const updatedTotal = updatedItems.reduce(
        (acc, curr) => acc + curr.subtotal,
        0
      );

      return {
        ...prevState,
        items: updatedItems,
        total: updatedTotal, // Recalculate the total
      };
    });
  };

  return (
    <CartDataContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
      }}
    >
      {children}
    </CartDataContext.Provider>
  );
}

// Hook untuk mengakses CartDataContext
export function useCartData() {
  return useContext(CartDataContext);
}
