import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddProduto from "./pages/AddProduto";
import CategoriaPage from "./pages/CategoriaPage";
import ProdutoPage from "./pages/ProdutoPage";
import LoginCadastro from "./pages/LoginCadastro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-produto" element={<AddProduto />} />
        <Route path="/categoria/:nome" element={<CategoriaPage />} />
        <Route path="/produto/:slug/:nome" element={<ProdutoPage />} />
        <Route path="/login" element={<LoginCadastro />} />
        <Route path="/cadastro" element={<LoginCadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
