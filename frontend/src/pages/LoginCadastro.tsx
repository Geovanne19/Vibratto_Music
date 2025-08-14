import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/global.css";

const LoginCadastro = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  const toggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLogin) {
      navigate("/cadastro");
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Formulário de ${isLogin ? "Login" : "Cadastro"} enviado!`);
  };

  return (
    <div className="background-login flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 ease-in-out">
        <div
          className={`flex w-[200%] transition-transform duration-500 ease-in-out ${
            isLogin ? "transform -translate-x-0" : "transform -translate-x-1/2"
          }`}
        >
          <div className="w-1/2 p-10 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Entrar
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Não tem uma conta?{" "}
              <button
                onClick={toggleForm}
                className="font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Cadastre-se
              </button>
            </p>
          </div>

          <div className="w-1/2 p-10 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Cadastro</h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <input
                type="text"
                placeholder="Nome de usuário"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cadastrar
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Já tem uma conta?{" "}
              <button
                onClick={toggleForm}
                className="font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCadastro;
