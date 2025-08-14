import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../styles/global.css"

function AddProduto() {
  const URL = "http://127.0.0.1:3000/produtos"
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [img, setImg] = useState('')
  const [mensagem, setMensagem] = useState('')

  function postProduto(e: React.FormEvent) {
    e.preventDefault()

    const novoProduto = {
      nome,
      preco,
      img
    }

    axios.post(URL, novoProduto)
      .then((resp: { data: any }) => {
        console.log('Produto adicionado:', resp.data)
        setMensagem('✅ Produto adicionado com sucesso!')

        setNome('')
        setPreco('')
        setImg('')

        setTimeout(() => {
          navigate('/home')
        }, 1500)
      })
      .catch((err: unknown) => {
        console.error('Erro ao adicionar produto:', err)
        setMensagem('❌ Erro ao adicionar produto.')
      })
  }

  return (
    <div className="flex flex-col items-center h-dvh justify-center bg">
      <h1 className="text-2xl font-bold mb-4">Adicionar Produto</h1>

      {mensagem && (
        <div className="mb-4 text-center text-green-700 font-medium bg-green-100 p-2 rounded-xl">
          {mensagem}
        </div>
      )}

      <form
        onSubmit={postProduto}
        className="flex flex-col bg-amber-200 p-10 rounded-2xl gap-3"
      >
        <input
          className="border-1 rounded-2xl p-1"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="border-1 rounded-2xl p-1"
          type="text"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input
          className="border-1 rounded-2xl p-1"
          type="text"
          placeholder="Imagem"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <button
          className="bg-white rounded-2xl cursor-pointer p-2 font-medium"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default AddProduto
