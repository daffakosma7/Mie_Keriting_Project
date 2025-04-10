import { useEffect, useState } from "react";

function useScrollToTop(){ 
    const [isVisible, setIsVisible] = useState(false);

    // Menampilkan tombol "scroll to top" saat scroll ke bawah lebih dari 100px
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setIsVisible(true); // Tampilkan tombol jika sudah scroll lebih dari 100px
        } else {
          setIsVisible(false); // Sembunyikan tombol jika di atas halaman
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Membersihkan event listener ketika komponen dibersihkan
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return isVisible
}

export default useScrollToTop