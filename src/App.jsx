import { useState, useEffect } from "react";

import "./App.css";

//4 custom hook

import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  // custom hook
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //resgatando dados
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setProducts(data);
  //   }

  //   fetchData();
  // }, []);

  // adição de produtos

  const handelSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    //   const res = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "aplication/json",
    //     },
    //     body: JSON.stringify(product),
    //   });

    //   // 3 carregamento dinamico
    //   const addedProducts = await res.json();

    //   setProducts((prevProducts) => [...prevProducts, addedProducts]);

    // refatorando POST

    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  // desafio 6

  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="app">
      <h1>Lista de Produtos</h1>
      {/* 6 - loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <ul>
          {items &&
            items.map((product) => (
              <li key={product.id}>
                {product.name} - R$: {product.price}
                <button onClick={() => handleRemove(product.id)}>
                  Excluir
                </button>
              </li>
            ))}
        </ul>
      )}
      <div className="add-product">
        <form onSubmit={handelSubmit}>
          <label>
            nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/* 7 - state de loading no post */}
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
