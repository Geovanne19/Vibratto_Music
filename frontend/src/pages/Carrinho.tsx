import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  img: string;
};

type CartItem = {
  id: number;
  produto?: Produto;
  quantidade: number;
};

function Carrinho() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer); 
    }
  }, [error]);

  const handleRemoveItem = async (itemId: number) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/cart_items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error(err);
      setError("Erro ao remover item do carrinho.");
    }
  };

  const handleUpdateQuantity = async (item: CartItem, newQuantity: number) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:3000/cart_items/${item.id}`,
        { quantidade: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantidade: response.data.quantidade }
            : cartItem
        )
      );
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 422) {
        setError(err.response.data.error || "Erro ao atualizar a quantidade.");
      } else {
        console.error(err);
        setError("Erro ao atualizar a quantidade.");
      }
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/cart_items", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar itens do carrinho");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [token]);

  // Exibe a tela de carregamento enquanto a API busca os dados
  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Carregando itens do carrinho...
      </p>
    );
  const total = cartItems.reduce(
    (sum, item) => sum + (item.produto?.preco || 0) * item.quantidade,
    0
  );

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded shadow-lg z-50 animate-slide-in-down">
          {error}
        </div>
      )}
      <div className="mt-18 flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center">Meu Carrinho</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Seu carrinho está vazio</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <ul className="space-y-4 flex-1">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center  justify-between p-4 border-1 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`${item.produto?.img}`}
                      alt={item.produto?.nome || "Produto"}
                      className="w-25 h-25 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">
                        {item.produto?.nome || "Produto não encontrado"}
                      </p>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <button
                          onClick={() => {
                            if (item.quantidade > 1) {
                              handleUpdateQuantity(item, item.quantidade - 1);
                            }
                          }}
                          className="px-2 py-0.5 border rounded text-sm bg-gray-200 hover:bg-gray-300 transition"
                        >
                          -
                        </button>
                        <span>{item.quantidade}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item, item.quantidade + 1)
                          }
                          className="px-2 py-0.5 border rounded text-sm bg-gray-200 hover:bg-gray-300 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-bold text-blue-600">
                      R$
                      {((item.produto?.preco || 0) * item.quantidade).toFixed(
                        2
                      )}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition cursor-pointer"
                      aria-label="Remover item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="w-full lg:w-1/3 p-6 bg-gray-100 rounded-lg shadow-md self-start">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium">Subtotal</p>
                <p className="font-semibold">R${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <p className="font-medium">Frete</p>
                <p className="font-semibold text-gray-500">Grátis</p>
              </div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-xl font-semibold">Total</p>
                <p className="text-xl font-semibold text-blue-600">
                  R${total.toFixed(2)}
                </p>
              </div>
              <button
              onClick={()=> {
                window.location.href = "/checkout";
              }}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

export default Carrinho;
