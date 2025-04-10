import BotttomNavCart from "../../components/ui/BottomNavCart";
import Cart from "../../components/ui/Cart";
import FilterSection from "../../components/ui/FilterSection";
import Footer from "../../components/Footer";
import ModalCancelOrder from "../../components/ui/ModalCancelOrder";
import ProductContainer from "../../components/ui/ProductContainer";
import ScrollToTop from "../../components/ui/ScrollToTop";

export default function Bakso() {
  return (
    <>
      <section id="home">
        <div className="frame">
          <ScrollToTop />
          <div className="frame"></div>
          <ModalCancelOrder />
          <FilterSection />

          {/* PRODUCT GOES DOWN HERE */}
          <div>
            <ProductContainer query={"bakso"} />
          </div>
          <BotttomNavCart />
          <Cart />
        </div>
      </section>
      <Footer />
    </>
  );
}
