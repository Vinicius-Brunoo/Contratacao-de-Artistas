import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

function Contratacoes() {
  const [contratacoes, setContratacoes] = useState([]);

  useEffect(() => {
    const fetchContratacoes = async () => {
      const querySnapshot = await getDocs(collection(db, "contratacoes"));
      const listaContratacoes = querySnapshot.docs.map((doc) => doc.data());
      setContratacoes(listaContratacoes);
    };

    fetchContratacoes();
  }, []);

  return (
    <div>
      <h1>Contratações Realizadas</h1>
      {contratacoes.map((contrato, index) => (
        <div key={index}>
          <p>Nome: {contrato.nome}</p>
          <p>Artista: {contrato.artista}</p>
          <p>Cachê: {contrato.cache}</p>
          <p>Data: {contrato.dataEvento}</p>
          <p>Endereço: {contrato.endereco}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Contratacoes;