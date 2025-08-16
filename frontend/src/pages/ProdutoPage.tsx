import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProdutoCard from "../components/ProdutoCard";
import "../styles/global.css";
import Depoimentos from "../components/Depoimentos";
import Titulo from "../components/Titulo";

type ProdutoType = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  img: string;
  categoria_id: number;
};

const zoomFactor = 2.5;

function ProdutoPage() {
  const { slug } = useParams();
  const [produto, setProduto] = useState<ProdutoType | null>(null);
  const [relacionados, setRelacionados] = useState<ProdutoType[]>([]);
  const navigate = useNavigate();
  const [paginaAtual, setPaginaAtual] = useState(0);

  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [magnifierBgPosition, setMagnifierBgPosition] = useState({
    x: 0,
    y: 0,
  });

  const [showCartModal, setShowCartModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalDuration = 4000; 

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para adicionar ao carrinho.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:3000/cart_items",
        { cart_item: { produto_id: produto?.id, quantidade: 1 } },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowCartModal(true);
      setIsClosing(false);

      setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setShowCartModal(false);
        }, 500);
      }, modalDuration);
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar ao carrinho.");
    }
  };

  useEffect(() => {
    if (!slug) return;

    axios
      .get<ProdutoType>(`http://127.0.0.1:3000/produtos/${slug}`)
      .then((response) => {
        setProduto(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produto:", error);
        navigate("/home");
      });
  }, [slug, navigate]);

  useEffect(() => {
    if (!produto) return;

    axios
      .get<ProdutoType[]>(
        `http://127.0.0.1:3000/produtos?categoria_id=${produto.categoria_id}`
      )
      .then((res) => {
        const produtosFiltrados = res.data
          .filter((p) => p.id !== produto.id)
          .map((p) => ({
            ...p,
            preco: Number(p.preco),
          }));
        setRelacionados(produtosFiltrados);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos relacionados:", error);
      });
  }, [produto]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = (
      e.target as HTMLImageElement
    ).getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMagnifierPosition({ x, y });

    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;
    setMagnifierBgPosition({ x: bgX, y: bgY });

    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  if (!produto) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container flex-grow mx-auto pl-6 pr-6 mt-19">
        <div className="flex justify-center items-center p-10">
          <div className="flex">
            <div
              className="relative w-max h-150 rounded mr-10 cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  produto.img ? `${produto.img}` : "/src/assets/no-image.png"
                }
                alt={produto.nome}
                className="w-full h-full object-cover transition-transform duration-200"
              />
              {showMagnifier && (
                <div
                  className="absolute w-64 h-64 rounded-full border border-white shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${magnifierPosition.x}px`,
                    top: `${magnifierPosition.y}px`,
                    backgroundImage: `url(${
                      produto.img
                        ? `${produto.img}`
                        : "/src/assets/no-image.png"
                    })`,
                    backgroundSize: `${zoomFactor * 100}%`,
                    backgroundPosition: `${magnifierBgPosition.x}% ${magnifierBgPosition.y}%`,
                  }}
                />
              )}
            </div>

            <div className="flex flex-col justify-between w-100 p-6">
              <div>
                <h2 className="font-semibold text-2xl">{produto.nome}</h2>
                <p className="text-blue-600 font-semibold text-xl mt-2">
                  R$ {Number(produto.preco).toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-gray-700">{produto.descricao}</p>
              <div className="flex flex-col gap-4 w-max">
                <div className="flex flex-col">
                  <p className="text-sm">Entrega</p>
                  <div>
                    <input
                      className="border border-gray-300 mt-1 mr-2 w-70 rounded p-2 text-sm"
                      type="text"
                      placeholder="Insira seu CEP"
                    />
                    <button className="p-2 rounded text-sm text-white bg-black cursor-pointer">
                      Simular
                    </button>
                  </div>
                </div>
                <button
                  onClick={addToCart}
                  className="p-2 border-2 rounded font-semibold text-blue-500 bg-transparent cursor-pointer flex items-center justify-center gap-2"
                >
                  <i className="bx bx-cart-plus text-2xl"></i>
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={() => {
                    navigate(`/checkout`);
                  }}
                  className="p-2 rounded text-white font-semibold text-base bg-blue-500 cursor-pointer"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative my-10">
          <h2 className="font-semibold text-xl text-gray-800 mb-5">
            Produtos relacionados:
          </h2>

          {relacionados.length === 0 ? (
            <p className="text-gray-500">
              Nenhum produto relacionado encontrado.
            </p>
          ) : (
            <div className="relative">
              <div className="flex items-center">
                <button
                  disabled={paginaAtual === 0}
                  onClick={() =>
                    setPaginaAtual((prev) => Math.max(prev - 1, 0))
                  }
                  className="text-3xl text-white absolute left-0 z-10 rounded-full disabled:opacity-30"
                >
                  <i className="bx bx-chevrons-left text-4xl cursor-pointer bg-blue-500 rounded-full p-1"></i>
                </button>

                <div className="w-full overflow-hidden px-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {relacionados
                      .slice(paginaAtual * 4, paginaAtual * 4 + 4)
                      .map((p) => (
                        <ProdutoCard
                          key={p.id}
                          id={p.id}
                          nome={p.nome}
                          descricao={p.descricao}
                          preco={p.preco}
                          img={p.img}
                        />
                      ))}
                  </div>
                </div>
                <button
                  disabled={(paginaAtual + 1) * 4 >= relacionados.length}
                  onClick={() =>
                    setPaginaAtual((prev) =>
                      (prev + 1) * 4 < relacionados.length ? prev + 1 : prev
                    )
                  }
                  className="absolute right-0 z-10 text-white bg-opacity-70 rounded-full disabled:opacity-30"
                >
                  <i className="bx p-1 bx-chevrons-right text-4xl bg-blue-500 cursor-pointer rounded-full"></i>
                </button>
              </div>
            </div>
          )}
        </div>

        <Titulo Texto="O que nossos clientes dizem" />
        <Depoimentos />
      </div>
      <Footer />

      {showCartModal && produto && (
        <div
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-2xl rounded-lg py-4 px-10 z-50 flex flex-col items-center justify-between ${
            isClosing ? "animate-fade-out-down" : "animate-fade-in-up"
          }`}
        >
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div
              key={Date.now()}
              className="h-full bg-blue-500"
              style={{
                animation: `progressBar ${modalDuration}ms linear forwards`,
              }}
            ></div>
          </div>

          <img
            src={produto.img ? produto.img : "/src/assets/no-image.png"}
            alt={produto.nome}
            className="w-16 h-16 rounded-full object-cover mr-4 border-green-500 border"
          />
          <div className="text-center mt-3">
            <p className="font-semibold">Adicionado ao carrinho!</p>
            <p className="text-sm text-gray-800 text-center">{produto.nome}</p>
          </div>
          <button
            onClick={() => navigate("/carrinho")}
            className="bg-blue-500 text-white font-semibold text-sm py-2 px-4 rounded hover:bg-blue-600 transition-colors whitespace-nowrap cursor-pointer mt-3"
          >
            Ir para o Carrinho
          </button>
        </div>
      )}
    </div>
  );
}

export default ProdutoPage;
