import { useLocation } from "react-router-dom";
export default function SucessoPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("redirect_status");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Pagamento {status === "succeeded" ? "Concluído!" : "Falhou"}
      </h1>
      <p className="text-gray-700">Obrigado por sua compra!</p>
    </div>
  );
}
