import useScrollToTop from "../../hooks/useScrollToTop"; // Hook untuk scroll ke atas
import { useCartData } from "../../context/CartDataContext"; // Menggunakan context yang sudah digabungkan

function ScrollToTop() {

  const { cartItems } = useCartData(); // Mengambil data dari CartDataContext
  const isVisible = useScrollToTop(); // Mengetahui apakah tombol scroll ke atas perlu ditampilkan

  // Fungsi untuk scroll ke atas
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Melakukan scroll ke atas dengan smooth scroll
  };

  return (
    <button
      className={`scroll-to-top ${cartItems.items && cartItems.items.length && "mb-16"}`} // Menambahkan class mb-16 jika data ada
      style={{ display: isVisible ? "block" : "none" }} // Menampilkan tombol hanya jika diperlukan
      onClick={handleScrollToTop} // Menambahkan event handler untuk scroll
    >
      <svg
        fill="#ffffff"
        height="30px"
        width="30px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 330 330"
        xmlSpace="preserve"
        stroke="#ffffff"
      >
        <path
          id="XMLID_224_"
          d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
        ></path>
      </svg>
    </button>
  );
}

export default ScrollToTop;
