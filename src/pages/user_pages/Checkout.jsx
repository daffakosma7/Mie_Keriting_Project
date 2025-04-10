import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCartData } from "../../context/CartDataContext";
import axios from "axios";

export default function Checkout() {
  const navigate = useNavigate();
  const [buyerName, setBuyerName] = useState("");
  const [openInformationData, setOpenInformationData] = useState(false);
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } =
    useCartData();

  const totalPrice = cartItems.total;

  const handleCheckout = async (data) => {
    if (!buyerName) {
      return alert("Masukkan namamu");
    }
    const updatedData = {
      customer: buyerName,
      items: data.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      total: data.total,
    };

    try {
      const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;
      const fetchCheckout = await axios.post(
        `${API_BASE_URL}/orders`,
        updatedData
      );

      if (fetchCheckout.data.status === "success") {
        alert("Your order has been created, please wait.");
        window.location.reload();
      } else {
        alert("Theres something wrong when making the order, please resubmit.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-black/50">
        <div className="flex justify-center">
          <section id="checkout">
            <div className="frame">
              <div className="frame">
                <div className="navbar flex justify-between z-50">
                  <div
                    className="back"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="69"
                      viewBox="0 0 68 69"
                      fill="none"
                    >
                      <rect
                        y="69"
                        width="68.8947"
                        height="68"
                        rx="15"
                        transform="rotate(-90 0 69)"
                        fill="white"
                      ></rect>
                      <path
                        d="M39.6667 20.1996L25.5 34.5527L39.6667 48.9058"
                        stroke="black"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div className="title"></div>
                  <div className="profile">
                    <div className="mr-16"></div>
                  </div>
                </div>
              </div>
              <dialog id="modalCancelOrder" className="modal">
                <div className="modal-box">
                  <img
                    src="https://myorderqr.interactive.co.id/_nuxt/illustration-payments.BE1-XgKz.png"
                    preload=""
                    loading="lazy"
                  />
                  <div className="btn-group">
                    <button className="btn-cancel">Tidak</button>
                  </div>
                </div>
              </dialog>
              <div className="head-title">
                <h2>CHECKOUT PESANAN</h2>
              </div>
              <div className="spacer"></div>
              <div className="type-order">
                <span className="">Jenis Pesanan</span>
                <div className="type-order-data">
                  <div>
                    <div className="type-order-option active">
                      <h2>Dine in</h2>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="spacer"></div>
              <div className="item-order">
                <div className="head">
                  <span>Pesanan Anda </span>
                  <span>Harga</span>
                </div>
                <div className="list-item-order">
                  {cartItems.items.map((item) => {
                    return (
                      <div key={item.id}>
                        <div>
                          <div className="item mb-2">
                            <div className="col-1">
                              <span className="item-name">
                                <span>
                                  ({item.quantity}x) {item.name}
                                </span>
                                <p className="font-grey">
                                  Rp&nbsp;
                                  {item.subtotal
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </p>
                                <p className="font-grey"></p>
                                <span className="font-bold"></span>
                              </span>
                              <div className="qty">
                                <div className="split-item">
                                  <div
                                    className="btn-minus"
                                    onClick={() => {
                                      decreaseQuantity(item.id);
                                    }}
                                  >
                                    <button className="btn">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="5"
                                        viewBox="0 0 21 5"
                                        fill="none"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M0.192383 2.5C0.192383 1.39543 1.08781 0.5 2.19238 0.5H18.1924C19.297 0.5 20.1924 1.39543 20.1924 2.5C20.1924 3.60457 19.297 4.5 18.1924 4.5H2.19238C1.08781 4.5 0.192383 3.60457 0.192383 2.5Z"
                                          fill="#DA2424"
                                        ></path>
                                      </svg>
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    placeholder={item.quantity}
                                    className="input input-ghost w-full max-w-xs"
                                    readOnly=""
                                  />
                                  <div
                                    className="btn-plus"
                                    onClick={() => {
                                      const updatedItem = {
                                        ...item,
                                        quantity: item.quantity + 1,
                                        subtotal:
                                          (item.quantity + 1) * item.price,
                                      };
                                      addToCart(updatedItem); // This will update the quantity and subtotal
                                    }}
                                  >
                                    <button className="btn">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M0.192383 10.498C0.192383 9.39348 1.08781 8.49805 2.19238 8.49805H18.1924C19.297 8.49805 20.1924 9.39348 20.1924 10.498C20.1924 11.6026 19.297 12.498 18.1924 12.498H2.19238C1.08781 12.498 0.192383 11.6026 0.192383 10.498Z"
                                          fill="white"
                                        ></path>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M10.1924 0.5C11.297 0.5 12.1924 1.39543 12.1924 2.5L12.1924 18.5C12.1924 19.6046 11.297 20.5 10.1924 20.5C9.08781 20.5 8.19238 19.6046 8.19238 18.5L8.19238 2.5C8.19238 1.39543 9.08781 0.5 10.1924 0.5Z"
                                          fill="white"
                                        ></path>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                <div
                                  onClick={() => {
                                    removeFromCart(item.id);
                                  }}
                                >
                                  <button>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25"
                                      height="25"
                                      viewBox="0 0 34 34"
                                      fill="none"
                                    >
                                      <path
                                        d="M13.964 7.28585H20.0354C20.0354 6.48073 19.7156 5.70859 19.1463 5.13928C18.577 4.56997 17.8048 4.25014 16.9997 4.25014C16.1946 4.25014 15.4225 4.56997 14.8531 5.13928C14.2838 5.70859 13.964 6.48073 13.964 7.28585ZM12.1426 7.28585C12.1426 5.99766 12.6543 4.76223 13.5652 3.85134C14.4761 2.94044 15.7115 2.42871 16.9997 2.42871C18.2879 2.42871 19.5233 2.94044 20.4342 3.85134C21.3451 4.76223 21.8569 5.99766 21.8569 7.28585H29.4462C29.6877 7.28585 29.9193 7.3818 30.0901 7.5526C30.2609 7.72339 30.3569 7.95503 30.3569 8.19657C30.3569 8.4381 30.2609 8.66975 30.0901 8.84054C29.9193 9.01133 29.6877 9.10728 29.4462 9.10728H27.8554L26.3777 26.8395C26.2701 28.1295 25.6818 29.3319 24.7293 30.2084C23.7767 31.0849 22.5296 31.5715 21.2352 31.5716H12.7643C11.4699 31.5715 10.2227 31.0849 9.27019 30.2084C8.31766 29.3319 7.72931 28.1295 7.62179 26.8395L6.14401 9.10728H4.55329C4.31176 9.10728 4.08011 9.01133 3.90932 8.84054C3.73853 8.66975 3.64258 8.4381 3.64258 8.19657C3.64258 7.95503 3.73853 7.72339 3.90932 7.5526C4.08011 7.3818 4.31176 7.28585 4.55329 7.28585H12.1426ZM9.43715 26.6877C9.50659 27.5224 9.88719 28.3006 10.5035 28.8678C11.1197 29.435 11.9267 29.75 12.7643 29.7501H21.2352C22.0727 29.75 22.8797 29.435 23.496 28.8678C24.1123 28.3006 24.4929 27.5224 24.5623 26.6877L26.0292 9.10728H7.97151L9.43715 26.6877ZM14.2676 13.3573C14.5091 13.3573 14.7408 13.4532 14.9116 13.624C15.0823 13.7948 15.1783 14.0265 15.1783 14.268V24.5894C15.1783 24.831 15.0823 25.0626 14.9116 25.2334C14.7408 25.4042 14.5091 25.5001 14.2676 25.5001C14.026 25.5001 13.7944 25.4042 13.6236 25.2334C13.4528 25.0626 13.3569 24.831 13.3569 24.5894V14.268C13.3569 14.0265 13.4528 13.7948 13.6236 13.624C13.7944 13.4532 14.026 13.3573 14.2676 13.3573ZM20.6426 14.268C20.6426 14.0265 20.5466 13.7948 20.3758 13.624C20.205 13.4532 19.9734 13.3573 19.7319 13.3573C19.4903 13.3573 19.2587 13.4532 19.0879 13.624C18.9171 13.7948 18.8212 14.0265 18.8212 14.268V24.5894C18.8212 24.831 18.9171 25.0626 19.0879 25.2334C19.2587 25.4042 19.4903 25.5001 19.7319 25.5001C19.9734 25.5001 20.205 25.4042 20.3758 25.2334C20.5466 25.0626 20.6426 24.831 20.6426 24.5894V14.268Z"
                                        fill="#DA2424"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-2">
                              <p className="">&nbsp;</p>
                              <p>
                                Rp&nbsp;
                                {item.subtotal
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    className="btn btn-add-more"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="25"
                      viewBox="0 0 27 25"
                      fill="none"
                    >
                      <path
                        d="M23.4744 9.25381L22.5302 5.87006C22.1658 4.56462 21.9836 3.91255 21.6099 3.42025C21.2373 2.93115 20.7313 2.55438 20.1497 2.33304C19.5646 2.10962 18.8731 2.10962 17.49 2.10962M3.52637 9.25381L4.47058 5.87006C4.83496 4.56462 5.01715 3.91255 5.39085 3.42025C5.76344 2.93115 6.26948 2.55438 6.85104 2.33304C7.43619 2.10962 8.12772 2.10962 9.51078 2.10962"
                        stroke="white"
                        strokeWidth="1.48451"
                      ></path>
                      <path
                        d="M9.51074 2.10876C9.51074 1.76426 9.65085 1.43387 9.90025 1.19027C10.1497 0.946667 10.4879 0.809814 10.8406 0.809814H16.1601C16.5128 0.809814 16.8511 0.946667 17.1005 1.19027C17.3499 1.43387 17.49 1.76426 17.49 2.10876C17.49 2.45326 17.3499 2.78365 17.1005 3.02725C16.8511 3.27085 16.5128 3.4077 16.1601 3.4077H10.8406C10.4879 3.4077 10.1497 3.27085 9.90025 3.02725C9.65085 2.78365 9.51074 2.45326 9.51074 2.10876Z"
                        stroke="white"
                        strokeWidth="1.48451"
                      ></path>
                      <path
                        d="M8.18164 13.7991V18.9948M18.8206 13.7991V18.9948M13.5011 13.7991V18.9948"
                        stroke="white"
                        strokeWidth="1.48451"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2.68088 18.2864C3.40699 21.122 3.77004 22.5391 4.85123 23.3653C5.93374 24.1901 7.42985 24.1901 10.4221 24.1901H16.5794C19.5716 24.1901 21.0677 24.1901 22.1515 23.3653C23.2327 22.5391 23.5957 21.122 24.3205 18.2864C25.4616 13.8284 26.0321 11.6007 24.8352 10.1018C23.637 8.60278 21.2831 8.60278 16.5807 8.60278H10.4207C5.71564 8.60278 3.36443 8.60278 2.16622 10.1018C1.46272 10.9811 1.3683 12.1125 1.64225 13.7986"
                        stroke="white"
                        strokeWidth="1.48451"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                    Tambah Pesanan Lainya
                  </button>
                </div>
                <div className="payment-detail">
                  <p className="label-text">Detail Pembayaran</p>
                  <div className="detail-item">
                    <span className="detail-text">Total</span>
                    <span className="detail-text">
                      Rp&nbsp;
                      {totalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </span>
                  </div>

                  <p className="detail-text"></p>
                </div>
              </div>
              <div className="card-summary">
                <div className="card-item">
                  <div className="item">
                    <h2>Total</h2>
                    <div className="price">
                      Rp&nbsp;
                      {totalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </div>
                  </div>
                </div>
                <div className="btn-group">
                  <button
                    className="btn btn-pay"
                    onClick={() => {
                      console.log;
                      setOpenInformationData((prevState) => !prevState);
                    }}
                  >
                    BAYAR
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <dialog
          id="modalSelectPayments"
          className="modal"
          style={{ border: "3px solid rgb(128, 128, 128)" }}
        >
          <div className="modal-box">
            <div className="title">Pilih Metode pembayaran</div>
            <div className="row-item">
              <div className="item cursor-pointer">
                <div className="col-1">
                  <img
                    src="https://myorderqr.interactive.co.id/_nuxt/edc.DmkDuqam.png"
                    loading="lazy"
                    alt=""
                  />
                  <span>EDC&nbsp;&nbsp;&nbsp;</span>
                  <div>
                    <p className="border-2 border-gray-300 rounded-md p-2 font-semibold text-[9px] text-black text-center">
                      Pembayaran di kasir
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="item cursor-pointer">
                <div className="col-1">
                  <img
                    src="https://myorderqr.interactive.co.id/_nuxt/cash.BnrwO27j.png"
                    loading="lazy"
                    alt=""
                  />
                  <span>CASH</span>
                  <div>
                    <p className="border-2 border-gray-300 rounded-md p-2 font-semibold text-[9px] text-black text-center">
                      Pembayaran di kasir
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <dialog id="modalQrisMethod" className="modal">
          <div className="modal-box">
            <img
              src="https://myorderqr.interactive.co.id/_nuxt/buble.GDiQiHTB.png"
              loading="lazy"
              preload=""
              className="buble-img"
              alt="Buble"
            />
            <div className="head">
              <div></div>
              <div className="description">
                <span>Pembayaran</span>
              </div>
              <form method="dialog">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M20 2.5C10.25 2.5 2.5 10.25 2.5 20C2.5 29.75 10.25 37.5 20 37.5C29.75 37.5 37.5 29.75 37.5 20C37.5 10.25 29.75 2.5 20 2.5ZM26.75 28.75L20 22L13.25 28.75L11.25 26.75L18 20L11.25 13.25L13.25 11.25L20 18L26.75 11.25L28.75 13.25L22 20L28.75 26.75L26.75 28.75Z"
                      fill="#DA2424"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
            <div className="total-price">
              <span className="title">Total Pembayaran</span>
              <span className="price">Rp&nbsp;12.500</span>
            </div>
            <div className="alert">
              <div className="head">
                <img
                  src="data:image/png;base64,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"
                  loading="lazy"
                  preload=""
                  alt=""
                  srcSet=""
                />
                <p>
                  Mohon segera membayar pesanan dan tunggu sampai muncul halaman
                  pembayaran berhasil
                </p>
              </div>
            </div>
            <div className="qris">
              <div
                style={{
                  width: "400px",
                  height: "400px",
                  backgroundColor: "rgb(240, 240, 240)",
                  filter: "blur(5px)",
                }}
              ></div>

              <span>QRIS MIE GACOAN</span>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <dialog id="modalPromo" className="modal bg-black/50">
          <div className="modal-box">
            <div className="modal-header">
              <h1>Pilih Promo</h1>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    d="M18 0.5C8.25 0.5 0.5 8.25 0.5 18C0.5 27.75 8.25 35.5 18 35.5C27.75 35.5 35.5 27.75 35.5 18C35.5 8.25 27.75 0.5 18 0.5ZM24.75 26.75L18 20L11.25 26.75L9.25 24.75L16 18L9.25 11.25L11.25 9.25L18 16L24.75 9.25L26.75 11.25L20 18L26.75 24.75L24.75 26.75Z"
                    fill="#232323"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <dialog id="modalPromoDetail" className="modal bg-black/50">
          <div className="modal-box">
            <div className="modal-header">
              <h1>Pilih Promo</h1>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    d="M18 0.5C8.25 0.5 0.5 8.25 0.5 18C0.5 27.75 8.25 35.5 18 35.5C27.75 35.5 35.5 27.75 35.5 18C35.5 8.25 27.75 0.5 18 0.5ZM24.75 26.75L18 20L11.25 26.75L9.25 24.75L16 18L9.25 11.25L11.25 9.25L18 16L24.75 9.25L26.75 11.25L20 18L26.75 24.75L24.75 26.75Z"
                    fill="#232323"
                  ></path>
                </svg>
              </button>
            </div>
            <hr />
            <div className="modal-promo"></div>
            <div></div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <dialog className="modal bg-black/50">
          <div className="modal-box flex flex-col">
            <div className="flex flex-row justify-end items-center">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    d="M18 0.5C8.25 0.5 0.5 8.25 0.5 18C0.5 27.75 8.25 35.5 18 35.5C27.75 35.5 35.5 27.75 35.5 18C35.5 8.25 27.75 0.5 18 0.5ZM24.75 26.75L18 20L11.25 26.75L9.25 24.75L16 18L9.25 11.25L11.25 9.25L18 16L24.75 9.25L26.75 11.25L20 18L26.75 24.75L24.75 26.75Z"
                    fill="#232323"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="mt-7 text-center">
              <h1>
                Produk yang anda pilih tidak memenuhi kriteria untuk menggunakan
                Promo ini
              </h1>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <dialog className="modal modal-general bg-black/50">
          <div className="modal-box flex flex-col" style={{ gap: "0px" }}>
            <div className="flex flex-row justify-end items-center">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    d="M18 0.5C8.25 0.5 0.5 8.25 0.5 18C0.5 27.75 8.25 35.5 18 35.5C27.75 35.5 35.5 27.75 35.5 18C35.5 8.25 27.75 0.5 18 0.5ZM24.75 26.75L18 20L11.25 26.75L9.25 24.75L16 18L9.25 11.25L11.25 9.25L18 16L24.75 9.25L26.75 11.25L20 18L26.75 24.75L24.75 26.75Z"
                    fill="#232323"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src="https://myorderqr.interactive.co.id/_nuxt/illustration-error.DW2ZpQS0.png"
                alt="error"
                style={{ width: "200px !important" }}
              />
            </div>
            <div className="mt-7 text-center">
              <h1 className="text-slate-950"></h1>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <dialog
        id="modalInformationData"
        className="modal"
        style={{ border: "3px solid rgb(128, 128, 128)" }}
        open={openInformationData}
      >
        <div className="modal-box" role="dialog">
          <h3>Isi nama dahulu</h3>
          <div className="form-control name">
            <div className="label">
              <span className="label-text">
                Nama <small className="text-error">*</small>
              </span>
            </div>
            <input
              type="text"
              placeholder="Nama pemesan"
              className="input input-bordered"
              autoFocus=""
              value={buyerName}
              onChange={(e) => {
                setBuyerName(e.target.value);
              }}
              required
            />
          </div>
          <button
            className="btn-primary"
            onClick={() => {
              handleCheckout(cartItems);
            }}
          >
            Mulai Pesan
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              setOpenInformationData((prevState) => !prevState);
            }}
          >
            close
          </button>
        </form>
      </dialog>
    </>
  );
}
