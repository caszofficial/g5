import React, { useEffect, useState } from "react";
import axios from "axios";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const Content = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [customQuantity, setCustomQuantity] = useState("");
  const [productName, setProductName] = useState("");

  const handleBuyTicket = async () => {
    try {
      localStorage.setItem("cantidad", quantity);
      const id = await comprarTicket();
      if (id) [setPreferenceId(id)];
    } catch (error) {
      console.log(error);
    }
  };

  const comprarTicket = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          title: productName,
          quantity: quantity,
          price: 5000,
        }
      );
      console.log(response.data);
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  initMercadoPago("TEST-9d60822a-b0e8-42d6-81bf-ec409508d8e8", {
    locale: "es-CO",
  });

  useEffect(() => {
    handleBuyTicket();
  }, [quantity, productName]);

  console.log(quantity, productName);
  return (
    <div>
      <h1>Ganate un Mercedez A200 0km</h1>
      <div style={{ marginBottom: "20px" }}>
        <img
          src="https://acroadtrip.blob.core.windows.net/catalogo-imagenes/l/RT_V_2e3dce5a6a514052a8f3236f33acfe1c.jpg"
          alt=""
          height="300px"
          width="100%"
        />
      </div>
      <div
        style={{
          margin: "20px",
        }}
      >
        <button
          onClick={() => {
            setQuantity(1);
            setCantidad(1);
            setProductName("Un Boleto");
          }}
          style={{
            width: "80%",
            margin: "5px",
            border: "none",
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "20px",
          }}
        >
          Comprar 1
        </button>
        {preferenceId && quantity !== "" && (
          <Wallet initialization={{ preferenceId: preferenceId }} />
        )}

        <br />
        <button
          onClick={() => {
            setQuantity(2);
            setCantidad(2);
            setProductName("Dos Boletos");
          }}
          style={{
            width: "80%",
            margin: "5px",
            border: "none",
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "20px",
          }}
        >
          Comprar 2
        </button>
        <br />
        <button
          onClick={() => {
            setQuantity(5);
            setCantidad(5);
            setProductName("Cinco Boletos");
          }}
          style={{
            width: "80%",
            margin: "5px",
            border: "none",
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "20px",
          }}
        >
          Comprar 5
        </button>
      </div>
      <input
        type="number"
        onChange={(e) => {
          setCustomQuantity(Number(e.target.value));
        }}
        // onChange={(e) => setCantidad(Number(e.target.value))}
        // value={cantidad || ""}
        // max={totalNumerosPosibles - numerosYaGenerados.size}
        placeholder="Comprar Mas Numeros"
        style={{
          border: "none",
          height: "20px",
          width: "80%",
          backgroundColor: "#f1f1f1",
          padding: "10px",
          borderRadius: "10px",
          marginBottom: "5px",
          fontSize: "20px",
        }}
      />
      <br />
      <button
        onClick={() => {
          setQuantity(customQuantity);
          setCantidad(customQuantity);
          setProductName(` ${quantity} Boletos`);
        }}
        style={{
          width: "80%",
          margin: "5px",
          border: "none",
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "20px",
        }}
      >
        Comprar
      </button>
    </div>
  );
};

export default Content;
