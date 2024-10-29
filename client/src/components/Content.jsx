import React, { useState } from "react";
import axios from "axios";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const Content = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  const comprarTicket = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          title: "Mi producto",
          quantity: 1,
          unit_price: 5000,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  initMercadoPago("TEST-9d60822a-b0e8-42d6-81bf-ec409508d8e8", {
    locale: "es-CO",
  });

  const handleBuy = async () => {
    const id = await comprarTicket();
    if (id) [setPreferenceId(id)];
  };

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
          onClick={handleBuy}
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
        {preferenceId && (
          <Wallet initialization={{ preferenceId: preferenceId }} />
        )}

        <br />
        <button
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
          Comprar 3
        </button>
      </div>
      <input
        type="number"
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
        type="submit"
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
