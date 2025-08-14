import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function Depoimentos() {
  const depoimentos = [
    {
      nome: "Maria Fernandes",
      foto: "https://i.pravatar.cc/150?img=5",
      estrelas: 5,
      texto:
        "A Vibratto me surpreendeu positivamente! Os instrumentos têm uma qualidade impressionante, e o atendimento foi extremamente atencioso. Recebi meu violão muito bem embalado e afinado!",
    },
    {
      nome: "Carlos Eduardo",
      foto: "https://i.pravatar.cc/150?img=3",
      estrelas: 4,
      texto:
        "Comprei uma guitarra e fiquei muito satisfeito com a experiência. O site é fácil de navegar, o processo de compra é rápido e seguro, e a entrega foi antes do prazo previsto. Com certeza voltarei a comprar.",
    },
    {
      nome: "Fernanda Lima",
      foto: "https://i.pravatar.cc/150?img=16",
      estrelas: 5,
      texto:
        "Sou iniciante e estava com dúvidas sobre qual instrumento escolher. O suporte da Vibratto foi incrível, me ajudou a entender as diferenças e escolher o ideal para meu nível. Estou muito feliz com a minha compra!",
    },
    {
      nome: "Ricardo Silva",
      foto: "https://i.pravatar.cc/150?img=11",
      estrelas: 5,
      texto:
        "A Vibratto realmente entende do assunto! Além de instrumentos de altíssima qualidade, eles também oferecem acessórios e dicas valiosas para músicos. Minha experiência foi excelente do começo ao fim.",
    },
  ];

  const [indexAtual, setIndexAtual] = useState(0);

  const proximoDepoimento = () => {
    setIndexAtual((prev) => (prev + 1) % depoimentos.length);
  };

  const depoimentoAnterior = () => {
    setIndexAtual(
      (prev) => (prev - 1 + depoimentos.length) % depoimentos.length
    );
  };

  useEffect(() => {
    const intervalo = setInterval(proximoDepoimento, 6000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg max-w-lg mx-auto shadow-lg relative">
      <img
        src={depoimentos[indexAtual].foto}
        alt={depoimentos[indexAtual].nome}
        className="w-20 h-20 rounded-full mb-4 border-4 border-blue-500"
      />
      <h3 className="text-xl font-semibold mb-2">
        {depoimentos[indexAtual].nome}
      </h3>
      <div className="flex justify-center mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            className={
              i < depoimentos[indexAtual].estrelas
                ? "text-yellow-500"
                : "text-gray-300"
            }
          />
        ))}
      </div>
      <p className="text-gray-700 italic mb-4">
        "{depoimentos[indexAtual].texto}"
      </p>

      <button
        onClick={depoimentoAnterior}
        className="flex absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 cursor-pointer"
      >
        <i className="bx bx-chevrons-left text-2xl text-blue-500"></i>
      </button>
      <button
        onClick={proximoDepoimento}
        className="flex absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 cursor-pointer"
      >
        <i className="bx bx-chevrons-right text-2xl text-blue-500"></i>
      </button>
    </div>
  );
}