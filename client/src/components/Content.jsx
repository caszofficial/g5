import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [quantity, setQuantity] = useState(0); // Controla la cantidad
  const [customQuantity, setCustomQuantity] = useState(0); // Controla cantidad personalizada
  const [productName, setProductName] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const price = 5000;
  const navigate = useNavigate(); // Para redirigir después del pago

  // Actualiza los datos del usuario
  const handleUserDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Maneja la creación de la preferencia de MercadoPago
  const handleBuyTicket = async () => {
    try {
      if (!userData.name || !userData.email) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      if (quantity <= 0) {
        alert("Selecciona una cantidad válida.");
        return;
      }

      // Guardar la cantidad y los datos en el almacenamiento local
      localStorage.setItem("cantidad", quantity);
      localStorage.setItem("userData", JSON.stringify(userData));

      const id = await comprarTicket();
      if (id) {
        setPreferenceId(id); // Guardamos el id de la preferencia
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Realiza la solicitud para crear la preferencia en MercadoPago
  const comprarTicket = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          title: productName,
          quantity: quantity,
          price: price,
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

  // Función que se llama cuando se cambia la cantidad personalizada
  const handleCustomQuantityChange = (e) => {
    setCustomQuantity(Number(e.target.value));
  };

  // Cuando se cambia la cantidad en los botones, actualizamos el estado
  const handleQuantityChange = (qty, name) => {
    setQuantity(qty);
    setProductName(name);
  };

  useEffect(() => {
    if (quantity > 0) {
      handleBuyTicket(); // Llama a la función de compra automáticamente si la cantidad cambia
    }
  }, [quantity, productName]);

  return (
    <div className="content">
      <h1 className="content-title">Gánate un Mercedes A200 0km</h1>
      <div style={{ marginBottom: "20px" }}>
        <img
          className="content-image"
          src="https://acroadtrip.blob.core.windows.net/catalogo-imagenes/l/RT_V_2e3dce5a6a514052a8f3236f33acfe1c.jpg"
          alt="Mercedes A200"
        />
      </div>
      <div className="content-valor">
        <p>Valor de cada participación</p>
        <p>${price}</p>
      </div>

      {/* Formulario para datos del usuario */}
      <div className="user-data-form">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={userData.name}
          onChange={handleUserDataChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={userData.email}
          onChange={handleUserDataChange}
        />
      </div>

      {/* Botones para seleccionar la cantidad */}
      <div className="buy-buttons">
        <button onClick={() => handleQuantityChange(1, "Un Boleto")}>
          Comprar 1 ${1 * price}
        </button>
        <br />
        <button onClick={() => handleQuantityChange(2, "Dos Boletos")}>
          Comprar 2 ${2 * price}
        </button>
        <br />
        <button onClick={() => handleQuantityChange(5, "Cinco Boletos")}>
          Comprar 5 ${5 * price}
        </button>
      </div>

      <div className="content-deseas-mas">
        <p>Si deseas adquirir más</p>
      </div>

      {/* Campo de entrada para cantidad personalizada */}
      <div className="buy-buttons-2">
        <input
          type="number"
          min={0}
          onChange={handleCustomQuantityChange}
          placeholder="10"
        />

        <button
          onClick={() => {
            setQuantity(customQuantity);
            setProductName(`${customQuantity} Boletos`);
          }}
        >
          Comprar{" "}
          {customQuantity
            ? `${customQuantity} - $${customQuantity * price}`
            : ""}
        </button>
      </div>

      {/* Wallet de MercadoPago solo si la preferencia es creada */}
      {preferenceId && quantity !== 0 && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
};

export default Content;
