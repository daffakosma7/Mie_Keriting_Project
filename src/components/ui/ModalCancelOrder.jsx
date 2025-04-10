import { useEffect, useRef } from 'react';

function ModalCancelOrder({ isOpen, onCancel, onConfirm }) {
  const modalRef = useRef(null);

  // Menampilkan dan menyembunyikan modal secara manual
  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal(); // Menampilkan modal
      } else {
        modalRef.current.close(); // Menutup modal
      }
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} id="modalCancelOrder" className="modal">
      <div className="modal-box">
        <img
          src="https://myorderqr.interactive.co.id/_nuxt/illustration-payments.BE1-XgKz.png"
          alt="Illustration"
          loading="lazy"
        />
        <div className="description">
          <h2>Anda yakin membatalkan pesanan?</h2>
        </div>
        <div className="btn-group">
          <button className="btn-confirm" onClick={onConfirm}>Ya</button>
          <button className="btn-cancel" onClick={onCancel}>Tidak</button>
        </div>
      </div>
    </dialog>
  );
}

export default ModalCancelOrder;
