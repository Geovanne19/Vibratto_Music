// src/pages/CategoriaPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProdutoCard from "../components/ProdutoCard";
import "../styles/global.css";

type ProdutoType = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  img: string;
};

function CategoriaPage() {
  const { nome } = useParams();
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/produtos?categoria_nome=${nome}`)
      .then((resp) => {
        const produtosComPrecoNum = resp.data.map((produto: any) => ({
          ...produto,
          preco:
            produto.preco !== undefined ? Number(produto.preco) : undefined,
        }));
        setProdutos(produtosComPrecoNum);
      })
      .catch((e) => {
        console.error("Erro ao buscar produtos da categoria:", e);
      });
  }, [nome]);

  return (
    <div className="min-h-screen flex flex-col mt-19">
      <Header />
      <main className="flex-grow">
        <div className="container flex-grow flex flex-col mx-auto pl-6 pr-6">
          <h1 className="text-xl font-semibold mb-10 mt-10">
            Produtos da categoria: <span className="text-blue-600 opacity-70">{nome}</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {produtos.length > 0 && produtos.map((produto) => (
              <ProdutoCard
                key={produto.id}
                id={produto.id}
                nome={produto.nome}
                descricao={produto.descricao}
                preco={produto.preco}
                img={produto.img}
              />
            ))}
            {produtos.length === 0 && (
              <p className="text-gray-600 col-span-full">
                Nenhum produto encontrado nesta categoria.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CategoriaPage;
