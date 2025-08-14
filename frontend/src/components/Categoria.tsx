import { useNavigate } from "react-router-dom";
import "../styles/Categoria.css";

type ProdutoProps = {
  nome: string;
  img: string;
};

function Categoria({ nome, img }: ProdutoProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/categoria/${encodeURIComponent(nome.toLowerCase())}`);
      }}
      className="relative rounded-3xl overflow-hidden cursor-pointer"
    >
      <span className="degrade-overlay"></span>
      <h2 className="drop-shadow-md titulo absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-3xl z-10">
        {nome.toUpperCase()}
      </h2>
      <img
        className=" object-cover hover:scale-110 transition-transform duration-400 ease-in-out"
        src={img}
        alt={nome}
      />
    </div>
  );
}

export default Categoria;
