import { useState, useEffect } from "react";

// refatorando o post

// 4 custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // refatorando o post
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  //6 loading

  const [loading, setLoading] = useState(false);

  // error

  const [error, setError] = useState(null);

  //8 Desafio 6
  const [itemid, setItemid] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      });

      setMethod(method);
      setItemid(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // loading
      setLoading(true);

      try {
        const res = await fetch(url);

        const json = await res.json();

        setData(json);
      } catch (error) {
        setError("Houve algum erro ao carregar os dados!");
      }
      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  // 5 refatorando post
  useEffect(() => {
    const httpRequest = async () => {
      let json;

      if (method === "POST") {
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);

        json = await res.json();
      } else if (method === "DELETE") {
        const deleteurl = `${url}/${itemid}`;

        const res = await fetch(deleteurl, config);

        json = await res.json();
      }
      setCallFetch(json);
    };
    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};
