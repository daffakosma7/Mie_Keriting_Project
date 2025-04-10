import { useCartData } from "../../context/CartDataContext"; // Sesuaikan dengan path file Anda
import { useNavigate } from "react-router-dom";

function BottomNavCart() {
  // Menggunakan useCartData untuk mendapatkan data cart dan status
  const { toggleCart, cartItems } = useCartData();
  const navigate = useNavigate();

  // Jika data tidak tersedia, tidak perlu merender komponen
  if (!cartItems.items || cartItems.items.length === 0) return;

  // Menghitung total harga dari cartItems
  const total = cartItems.total;

  return (
    <div className="bottom-nav-cart">
      <div className="content">
        <div className="total">
          <button className="btn-icon-cart" onClick={toggleCart}>
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="34"
                viewBox="0 0 35 34"
                fill="none"
              >
                <path
                  d="M30.6055 12.3752L29.3334 7.81649C28.8425 6.05774 28.597 5.17924 28.0936 4.51599C27.5916 3.85706 26.9098 3.34945 26.1263 3.05124C25.338 2.75024 24.4063 2.75024 22.543 2.75024M3.73047 12.3752L5.00255 7.81649C5.49347 6.05774 5.73893 5.17924 6.24239 4.51599C6.74437 3.85706 7.42612 3.34945 8.20964 3.05124C8.99797 2.75024 9.92964 2.75024 11.793 2.75024"
                  stroke="#272829"
                  strokeWidth="2"
                ></path>
                <path
                  d="M11.793 2.75C11.793 2.28587 11.9817 1.84075 12.3177 1.51256C12.6537 1.18437 13.1095 1 13.5846 1H20.7513C21.2265 1 21.6822 1.18437 22.0182 1.51256C22.3542 1.84075 22.543 2.28587 22.543 2.75C22.543 3.21413 22.3542 3.65925 22.0182 3.98744C21.6822 4.31563 21.2265 4.5 20.7513 4.5H13.5846C13.1095 4.5 12.6537 4.31563 12.3177 3.98744C11.9817 3.65925 11.793 3.21413 11.793 2.75Z"
                  stroke="#272829"
                  strokeWidth="2"
                ></path>
                <path
                  d="M10.0029 18.5002V25.5002M24.3363 18.5002V25.5002M17.1696 18.5002V25.5002"
                  stroke="#272829"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2.59094 24.5465C3.56919 28.3667 4.05831 30.276 5.51494 31.389C6.97336 32.5002 8.98898 32.5002 13.0202 32.5002H21.3156C25.3469 32.5002 27.3625 32.5002 28.8227 31.389C30.2794 30.276 30.7685 28.3667 31.7449 24.5465C33.2822 18.5405 34.0508 15.5392 32.4383 13.5197C30.824 11.5002 27.6528 11.5002 21.3174 11.5002H13.0184C6.67952 11.5002 3.51186 11.5002 1.89756 13.5197C0.949773 14.7045 0.822565 16.2287 1.19165 18.5002"
                  stroke="#272829"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
            <div className="badge badge-primary badge-md">
              {cartItems.items.length}
            </div>
            {/* ANGKA AKAN BERUBAH TERGANTUNG BERAPA BANYAK ITEM */}
          </button>
          <span>
            {" "}
            TOTAL : Rp&nbsp;
            {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/checkout");
            }}
          >
            {" "}
            CHECKOUT{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11.2727 20.3149C11.1824 20.4104 11.1119 20.5227 11.0651 20.6455C11.0183 20.7682 10.9961 20.8989 10.9998 21.0302C11.0035 21.1615 11.0331 21.2908 11.0867 21.4107C11.1404 21.5306 11.2172 21.6387 11.3127 21.7289C11.4081 21.8192 11.5204 21.8897 11.6432 21.9365C11.7659 21.9833 11.8966 22.0055 12.0279 22.0018C12.1592 21.9981 12.2885 21.9685 12.4084 21.9149C12.5283 21.8612 12.6364 21.7844 12.7267 21.6889L21.2267 12.6889C21.4022 12.5033 21.5 12.2575 21.5 12.0019C21.5 11.7464 21.4022 11.5006 21.2267 11.3149L12.7267 2.31395C12.637 2.21639 12.5289 2.1376 12.4086 2.08218C12.2883 2.02676 12.1581 1.99579 12.0257 1.99109C11.8933 1.98639 11.7613 2.00804 11.6374 2.05478C11.5134 2.10153 11.4 2.17244 11.3037 2.26339C11.2073 2.35434 11.1301 2.46353 11.0763 2.58461C11.0225 2.70568 10.9933 2.83624 10.9905 2.96869C10.9876 3.10113 11.011 3.23283 11.0595 3.35613C11.1079 3.47944 11.1804 3.59188 11.2727 3.68695L19.1247 12.0019L11.2727 20.3149Z"
                fill="white"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BottomNavCart;
