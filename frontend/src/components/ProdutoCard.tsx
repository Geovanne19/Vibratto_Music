import { useNavigate } from "react-router-dom";

type ProdutoCardProps = {
  id: number;
  nome: string;
  descricao: string;
  preco: number | string;
  img: string;
};

function ProdutoCard({ id, nome, preco, img }: ProdutoCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="border overflow-hidden border-gray-100 rounded shadow p-0 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
      onClick={() =>
        navigate(`/produto/${id}/${encodeURIComponent(nome.toLowerCase())}`)
      }
    >
      <img
        src={img ? `${img}` : "/src/assets/no-image.png"}
        alt={nome}
        className="max-w-full max-h-full object-cover rounded hover:scale-105 transition-transform duration-300 ease-in-out"
      />
      <div className="p-4 pt-1">
        <h3 className="font-semibold mt-2">{nome}</h3>
        <p className="text-blue-600 font-bold">R$ {Number(preco).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProdutoCard;
