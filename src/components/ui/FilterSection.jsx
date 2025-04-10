
import { useNavigate } from "react-router-dom";


export default function FilterSection() {
  const navigate = useNavigate()
  return (
    <div className="sort-item">
      <div className="btn-group flex items-center justify-start gap-2 max-w-full min-w-full overflow-x-auto">
        <button className="btn btn-primary" onClick={()=>{navigate('/')}}>
          <span>Semua Produk</span>
        </button>
        <button className="btn btn-muted" onClick={()=>{
          navigate('/mie')
        }}>MIE</button>
        <button className="btn btn-muted" onClick={()=>{
          navigate('/bakso')
        }}>BAKSO</button>
      </div>
      <div className="p-[10px] rounded-[5px] w-full text-sm font-normal flex items-center mt-[8px] bg-[#FFDADA] border border-[#DA2424] text-black">
        <span>Note : Untuk pesanan bungkus wajib pesan dikasir</span>
      </div>
    </div>
  );
}

