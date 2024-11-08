import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const Content = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [customQuantity, setCustomQuantity] = useState("");
  const [productName, setProductName] = useState("");

  const price = 5000;

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
        "https://g5be-399w477nd-caszofficials-projects.vercel.app/api/mercadopago/create_preference",
        {
          title: productName,
          quantity: quantity,
          price: price,
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

  useEffect(() => {
    if(quantity && productName){
      handleBuyTicket()
    }
  }, [quantity, productName]);

  return (
    <div className="content">
      <h1 className="content-title">Ganate un Mercedes A200 0km</h1>
      <div style={{ marginBottom: "20px" }}>
        <img
          className="content-image"
          src="https://acroadtrip.blob.core.windows.net/catalogo-imagenes/l/RT_V_2e3dce5a6a514052a8f3236f33acfe1c.jpg"
          alt=""
        />
      </div>
      <div className="content-valor">
        <p>Valor de cada participacion</p>
        <p>${price}</p>
      </div>
      <div className="buy-buttons">
        <button
          onClick={() => {
            setQuantity(1);
            setProductName("Un Boleto");
          }}
        >
          Comprar 1 ${1 * price}
        </button>
        <br />
        <button
          onClick={() => {
            setQuantity(2);
            setProductName("Dos Boletos");
          }}
        >
          Comprar 2 ${2 * price}
        </button>
        <br />
        <button
          onClick={() => {
            setQuantity(5);
            setProductName("Cinco Boletos");
          }}
        >
          Comprar 5 ${5 * price}
        </button>
      </div>
      <div className="content-deseas-mas">
        <p>Si Deseas Adquirir Más</p>
      </div>
      <div className="buy-buttons-2">
        <input
          type="number"
          min={0}
          onChange={(e) => {
            setCustomQuantity(Number(e.target.value));
          }}
          placeholder="10"
        />

        <button
          onClick={() => {
            setQuantity(customQuantity);
            setProductName(` ${quantity} Boletos`);
            handleBuyTicket();
          }}
        >
          Comprar
          {customQuantity
            ? " " + customQuantity + " " + "$" + customQuantity * price
            : ""}
        </button>
      </div>
      {preferenceId && quantity !== "" && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
};

export default Content;
