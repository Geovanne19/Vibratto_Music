import { useEffect, useState } from "react";
import logo from "../assets/logo-vibratto.png";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  img: string;
};

// Define a interface para os dados do usuário
type UserData = {
  nome: string;
  email: string;
  url_img: string;
};

export const Header = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState<Produto[]>([]);
  const [showResultados, setShowResultados] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null); // Novo estado para os dados do usuário
  const [showUserDetails, setShowUserDetails] = useState(false); // Novo estado para exibir os detalhes do usuário

  useEffect(() => {
    // 1. Tentar carregar os dados do localStorage ao iniciar
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userData");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    }

    // 2. Processar a URL após o login do Google (se houver parâmetros)
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    const nome = urlParams.get("nome");
    const email = urlParams.get("email");
    const url_img = urlParams.get("url_img");

    if (urlToken && nome && email && url_img) {
      // Salvar as informações no localStorage
      localStorage.setItem("token", urlToken);
      const user = { nome, email, url_img };
      localStorage.setItem("userData", JSON.stringify(user));

      setIsLoggedIn(true);
      setUserData(user);

      // Limpar os parâmetros da URL para evitar problemas de segurança
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  useEffect(() => {
    if (busca.trim().length > 0) {
      const filtrados = produtos.filter((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase())
      );
      setResultados(filtrados);
      setShowResultados(true);
    } else {
      setShowResultados(false);
    }
  }, [busca, produtos]);

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:3000/users/auth/google_oauth2";
  };

  const handleLogout = () => {
    // Apenas remove os dados do localStorage e atualiza o estado
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-around items-center overflow-visible h-19 cursor-pointer bg-white shadow-md z-50">
      <img
        onClick={() => {
          window.location.href = "/home";
        }}
        className="h-14"
        src={logo}
        alt="logo"
      />

      <div className="relative border border-gray-400 rounded-xl flex items-center focus-within:border-blue-600 bg-white">
        <input
          className="outline-none pl-3 w-80 h-10"
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar produtos..."
        />
        <button className="flex items-center pr-2 pl-2 cursor-pointer">
          <i className="bx bx-search text-blue-600 text-2xl"></i>
        </button>

        {showResultados && (
          <ul className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
            {resultados.length > 0 ? (
              resultados.map((produto) => (
                <li
                  key={produto.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/produto/${
                      produto.id
                    }/${encodeURIComponent(produto.nome.toLowerCase())}`)
                  }
                >
                  <img
                    src={produto.img}
                    alt={produto.nome}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="text-sm text-gray-700">{produto.nome}</span>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500 text-sm">
                Nenhum produto encontrado
              </li>
            )}
          </ul>
        )}
      </div>

      {isLoggedIn && userData ? (
        // Se o usuário estiver logado, exibe a foto e o pop-up
        <div className="relative">
          <img
            src={userData.url_img}
            alt={userData.nome}
            onClick={() => setShowUserDetails(!showUserDetails)}
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500 transition duration-200"
          />

          {showUserDetails && (
            <div className="absolute top-12 right-0 w-max bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={userData.url_img}
                  alt={userData.nome}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">{userData.nome}</p>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
              </div>
              <hr className="my-2" />
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-700 p-2 rounded-md transition duration-200"
              >
                <i className="bx bx-log-out text-xl"></i>
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        // Se o usuário não estiver logado, exibe o botão
        <button
          onClick={handleGoogleLogin}
          className="cursor-pointer bg-blue-500 text-white font-semibold rounded-3xl pl-2 pr-4 py-2 flex items-center gap-2 hover:bg-blue-600 transition duration-200"
        >
          <span className="flex items-center gap-3 text-sm">
            <img
              className="w-7 bg-white rounded-full"
              src="src/assets/logo-google.png"
              alt=""
            />
            Entrar com o Google
          </span>
        </button>
      )}
    </header>
  );
};

export default Header;
