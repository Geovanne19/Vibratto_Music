import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Footer from "../components/Footer";
import Header from "../components/Header";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

type ProdutoType = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  img?: string;
};

function CheckoutForm({ total }: { clientSecret: string; total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/sucesso",
      },
    });

    if (error) {
      alert(error.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <form className="flex flex-col h-full justify-between p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Finalizar Pagamento
        </h2>

        <p className="text-center text-xl font-semibold text-green-600 mb-6">
          Total: R$ {total.toFixed(2)}
        </p>

        <div className="mb-6">
          <PaymentElement options={{ layout: "tabs" }} />
        </div>
      </div>

      {!success && (
        <button
          onClick={handleSubmit}
          disabled={!stripe || loading}
          className={`w-full py-3 cursor-pointer rounded-xl font-semibold text-white transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Processando..." : "Pagar Agora"}
        </button>
      )}

      {success && (
        <p className="text-center text-green-600 font-semibold mt-4">
          Pagamento realizado com sucesso!
        </p>
      )}
    </form>
  );
}

export default function CheckoutPage() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para acessar o checkout.");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/cart_items`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const items = res.data.map((p: any) => ({
          id: p.id,
          nome: p.produto.nome,
          preco: Number(p.produto.preco),
          quantidade: p.quantidade,
          img: p.produto.img,
        }));
        setProdutos(items);

        const valorTotal = items.reduce(
          (acc: number, item: ProdutoType) =>
            acc + item.preco * item.quantidade,
          0
        );
        setTotal(valorTotal);

        return axios.post(
          `${import.meta.env.VITE_API_URL}/create-payment-intent`,
          { amount: valorTotal },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !clientSecret) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Carregando pagamento...</p>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen mt-19">
      <Header/>
      <div className="min-h-screen flex bg-gray-50 p-6">
        <div className="flex flex-1 max-w-6xl mx-auto gap-8 h-full">

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex-1 overflow-y-auto max-h-[83vh]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Resumo do Pedido
            </h2>
            <ul className="divide-y divide-gray-200">
              {produtos.map((p) => (
                <li key={p.id} className="py-4 flex items-center gap-4">
                  {p.img && (
                    <img
                      src={p.img}
                      alt={p.nome}
                      className="w-16 h-16 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">{p.nome}</p>
                    <p className="text-gray-500 text-sm">
                      {p.quantidade} x R$ {p.preco.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    R$ {(p.preco * p.quantidade).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <p className="font-bold text-lg">Total: R$ {total.toFixed(2)}</p>
            </div>
          </div>
          {/* Formulário de pagamento */}
          <div className="flex-1 h-full">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} total={total} />
            </Elements>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
