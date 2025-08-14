import { useEffect, useState } from "react";
import Categoria from "../components/Categoria";
import Header from "../components/Header";
import "../styles/Home.css";
import axios from "axios";
import Footer from "../components/Footer";
import Banner from "../assets/img-banner.png";
import ProdutoCard from "../components/ProdutoCard";
import Titulo from "../components/Titulo";
import Depoimentos from "../components/Depoimentos";

const CATEGORIAS_URL = "http://127.0.0.1:3000/categorias";
const PRODUTOS_URL = "http://127.0.0.1:3000/produtos";

type CategoriaType = {
  id: number
  nome: string;
  img: string;
};

type ProdutoType = {
  id: number;
  nome: string;
  preco: number;
  img: string;
};

function Home() {
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [produtosExibidos, setProdutosExibidos] = useState(10);

  function getCategorias() {
    axios
      .get(CATEGORIAS_URL)
      .then((resp) => {
        setCategorias(resp.data);
      })
      .catch((e) => {
        console.error("Erro ao buscar Categorias", e);
      });
  }

  function getProdutos() {
    axios
      .get(PRODUTOS_URL)
      .then((resp) => {
        const produtosConvertidos = resp.data.map((produto: any) => ({
          ...produto,
          preco: parseFloat(produto.preco),
        }));

        const produtosEmbaralhados = produtosConvertidos.sort(
          () => Math.random() - 0.5
        );
        setProdutos(produtosEmbaralhados);
      })
      .catch((e) => {
        console.error("Erro ao buscar Produtos", e);
      });
  }

  useEffect(() => {
    getCategorias();
    getProdutos();
  }, []);

  const handleVerMais = () => {
    setProdutosExibidos(produtosExibidos + 10);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow mx-auto mt-4 pl-25 pr-25">
        <img
          className="w-full mt-19 rounded-3xl mb-8 cursor-pointer"
          src={Banner}
          alt="Banner"
        />

        <section className="Categorias grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8 justify-items-center">
          {categorias.map((categoria) => (
            <Categoria
              key={categoria.id}
              nome={categoria.nome}
              img={categoria.img}
            />
          ))}
        </section>

        <Titulo Texto="Nossos Produtos" />

        <section className="Produtos grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-10 cursor-pointer min-h-50">
          {produtos.length > 0 &&
            produtos
              .slice(0, produtosExibidos)
              .map((produto) => (
                <ProdutoCard
                  key={produto.id}
                  id={produto.id}
                  nome={produto.nome}
                  preco={produto.preco}
                  img={produto.img}
                  descricao=""
                />
              ))}
          {produtos.length === 0 && (
            <p className="flex col-span-full w-full text-gray-500 items-center justify-center text-xl">
              Nenhum produto encontrado.
            </p>
          )}
        </section>

        {produtosExibidos < produtos.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleVerMais}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded cursor-pointer"
            >
              Ver Mais
            </button>
          </div>
        )}

        <div className="mt-10 text-center relative">
          <Titulo Texto="O que nossos clientes dizem" />
          <Depoimentos></Depoimentos>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
