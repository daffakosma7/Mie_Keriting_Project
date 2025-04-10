import { useCartData } from "../../context/CartDataContext";

export default function CartItem({ item }) {
  const { addToCart, removeFromCart, decreaseQuantity } = useCartData();

  const increaseQuantity = () => {
    const updatedItem = {
      ...item,
      quantity: item.quantity + 1,
      subtotal: (item.quantity + 1) * item.price,
    };
    addToCart(updatedItem); // This will update the quantity and subtotal
  };

  return (
    <div className="list-product-cart">
      <div className="card-cart-item">
        <div className="product">
          <div className="images">
            <div>
              <img src={`${item.image}`} loading="lazy" alt="" />
            </div>
          </div>
          <div className="content">
            <div className="description">
              <div className="information text-wrap">
                <div className="title">{item.name}</div>
                <div className="price">
                  Rp&nbsp;
                  {item.subtotal
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>
              </div>
              <div className="trash">
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                  }}
                >
                  {/* Trash icon */}
                </button>
              </div>
            </div>
            <div className="btn-group">
              <div className="split-item">
                <div className="btn-minus">
                  <button className="btn" onClick={() => decreaseQuantity(item.id)}>
                    -
                  </button>
                </div>
                <input
                  type="text"
                  placeholder={item.quantity}
                  className="input input-ghost w-full max-w-xs"
                  readOnly
                />
                <div className="btn-plus">
                  <button className="btn" onClick={increaseQuantity}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
