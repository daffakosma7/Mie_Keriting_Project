import { useCartData } from "../context/CartDataContext";

function Footer() {
  const { cartItems } = useCartData();
  return (
    <>
      <div className="flex justify-center">
        <div className="all-items-text">Semua item sudah dimunculkan</div>
      </div>
      <div className="flex justify-center">
        <div className="spacer"></div>
      </div>
      <div className={`flex justify-center ${cartItems.items && cartItems.items.length && "mb-[65px]"}`}>
        <section id="footer">
          <span>© 2024, InterActive. All rights reserved</span>
        </section>
      </div>
    </>
  );
}

export default Footer;
