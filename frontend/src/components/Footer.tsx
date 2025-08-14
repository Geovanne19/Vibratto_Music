import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Geovanne Rodrigues. Todos os
          direitos reservados.
        </p>

        <div className="flex gap-4">
          <a
            href="https://github.com/seu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/seu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="mailto:seuemail@exemplo.com"
            className="hover:text-gray-400 transition"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
