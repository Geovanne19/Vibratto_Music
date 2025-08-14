function Titulo({Texto}: {Texto: string}) {
    return (
      <h2 className="titulo font-bold text-4xl text-blue-600 text-center border-blue-600 border-3 p-4 pt-5 mb-8">
        {Texto}
      </h2>
    );
}

export default Titulo