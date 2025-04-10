import { useCartData } from "../../context/CartDataContext";

export default function ProductCard({ item }) {
  const { addToCart, cartItems } = useCartData(); // Mengambil cartItems dan addToCart dari context

  // Ensure item has a valid quantity and price when adding it to the cart for the first time
  const ensureQuantityInItem = (item) => {
    const validQuantity = item.quantity && !isNaN(item.quantity) ? item.quantity : 1;
    const validPrice = item.price && !isNaN(item.price) ? item.price : 0;
    return {
      ...item,
      quantity: validQuantity,
      subtotal: validQuantity * validPrice, // Ensure subtotal is valid
    };
  };

  // Function to find an existing item in the cart
  const findItemInCart = (itemId) => {
    const items = Array.isArray(cartItems) ? cartItems : [];

    return items.find(cartItem => cartItem.id === itemId); // Compare by item ID
  };

  // Handler for increasing the quantity
  const increaseQuantity = () => {
    const existingItem = findItemInCart(item.id);

    if (existingItem) {
      // If item exists, update its quantity and subtotal
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1, // Increase the quantity
        subtotal: (existingItem.quantity + 1) * existingItem.price, // Recalculate subtotal
      };

      addToCart(updatedItem); // Update the cart with the new item
    } else {
      // If item doesn't exist in the cart, add it with quantity 1
      const newItem = ensureQuantityInItem(item);

      addToCart(newItem); // Add the new item to the cart
    }
  };

  return (
    <div className="product-item">
      <div className="card bg-base-100 shadow-xl" rel="preload">
        <figure>
          <img
            src={
              item.image ||
              "https://myprofit.interactiveholic.net/myprofit/images/products/myresto-161001.jpg"
            }
            className="image-card"
            width="327"
            height="322"
            loading="lazy"
          />
        </figure>
        <div className="card-body">
          <div className="card-title">.
            <span className="min-h-[35px]">{item.name}</span>
          </div>
          <div className="flex flex-row w-full justify-start gap-1 text-black items-center">
            <span className="font-medium">
              Rp&nbsp;
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>
          </div>
          <div
            className="card-actions cursor-pointer"
            onClick={increaseQuantity}
          >
            <div className="btn-add-cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
              >
                <path
                  d="M23.4744 9.77016L22.5302 6.38642C22.1658 5.08098 21.9836 4.42891 21.6099 3.93661C21.2373 3.44751 20.7313 3.07074 20.1497 2.84939C19.5646 2.62598 18.8731 2.62598 17.49 2.62598M3.52637 9.77016L4.47058 6.38642C4.83496 5.08098 5.01715 4.42891 5.39085 3.93661C5.76344 3.44751 6.26948 3.07074 6.85104 2.84939C7.43619 2.62598 8.12772 2.62598 9.51078 2.62598"
                  stroke="white"
                  strokeWidth="1.48451"
                ></path>
                <path
                  d="M9.51074 2.62511C9.51074 2.28061 9.65085 1.95022 9.90025 1.70662C10.1497 1.46302 10.4879 1.32617 10.8406 1.32617H16.1601C16.5128 1.32617 16.8511 1.46302 17.1005 1.70662C17.3499 1.95022 17.49 2.28061 17.49 2.62511C17.49 2.96962 17.3499 3.30001 17.1005 3.54361C16.8511 3.78721 16.5128 3.92406 16.1601 3.92406H10.8406C10.4879 3.92406 10.1497 3.78721 9.90025 3.54361C9.65085 3.30001 9.51074 2.96962 9.51074 2.62511Z"
                  stroke="white"
                  strokeWidth="1.48451"
                ></path>
                <path
                  d="M8.18213 14.3154V19.5112M18.8211 14.3154V19.5112M13.5016 14.3154V19.5112"
                  stroke="white"
                  strokeWidth="1.48451"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2.68088 18.8028C3.40699 21.6384 3.77004 23.0555 4.85123 23.8816C5.93374 24.7065 7.42985 24.7065 10.4221 24.7065H16.5794C19.5716 24.7065 21.0677 24.7065 22.1515 23.8816C23.2327 23.0555 23.5957 21.6384 24.3205 18.8028C25.4616 14.3448 26.0321 12.1171 24.8352 10.6181C23.637 9.11914 21.2831 9.11914 16.5807 9.11914H10.4207C5.71564 9.11914 3.36443 9.11914 2.16622 10.6181C1.46272 11.4975 1.3683 12.6289 1.64225 14.3149"
                  stroke="white"
                  strokeWidth="1.48451"
                  strokeLinecap="round"
                ></path>
              </svg>
              <span> Tambah Pesanan </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
