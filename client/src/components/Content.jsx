import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Progress } from "rsuite";
import "rsuite/Progress/styles/index.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import CircularProgress from "@mui/material/CircularProgress";

const Content = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [customQuantity, setCustomQuantity] = useState("");
  const [productName, setProductName] = useState("");
  const [porcentaje, setPorcentaje] = useState(null);
  const [loading, setLoading] = useState(true);

  const price = 8000;

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
        import.meta.env.VITE_ENV === "prod"
          ? "https://g5.onrender.com/api/mercadopago/create_preference"
          : "http://localhost:3000/api/mercadopago/create_preference",
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

  initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
    locale: "es-CO",
  });

  useEffect(() => {
    const getPorcentaje = async () => {
      try {
        const data = await axios.get(
          import.meta.env.VITE_ENV === "prod"
            ? "https://g5.onrender.com/api/porcentaje"
            : "http://localhost:3000/api/porcentaje"
        );

        setPorcentaje(Number(data.data.porcentaje.toFixed(2)));
      } catch (error) {
        console.log("error al traer el porcentaje");
      }
    };
    getPorcentaje();
  }, []);

  useEffect(() => {
    if (quantity && productName) {
      handleBuyTicket();
    }
  }, [quantity, productName]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [loading]);

  useEffect(() => {
    // Event listener para detectar cuando el usuario cierra o recarga la página
    const handleBeforeUnload = () => {
      localStorage.removeItem("cantidad"); // Borra la cantidad seleccionada en localStorage
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Limpiar el evento al desmontar el componente (para evitar fugas de memoria)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="content">
      {loading ? (
        <div
          style={{
            display: "flex",
            margin: "auto",
          }}
        >
          <CircularProgress sx={{ color: "#071938" }} />
        </div>
      ) : (
        <div id="loaded-content">
          <h1 className="content-title">Dinamica Actual</h1>
          <h3>Chevrolet Onix RS 0km +</h3>
          <h3>$10.000.000</h3>
          <div className="content-image-container">
            <div>
              <img
                className="content-image"
                src="https://firebasestorage.googleapis.com/v0/b/sds-main-29a46.firebasestorage.app/o/images%2Fcarro2.jpeg?alt=media&token=3fa0ccc3-57f8-467a-a978-8b15f20207a6"
                alt=""
              />
            </div>
          </div>
          <div className="content-percentage">
            <p>Hemos vendido</p>
            <Progress.Line percent={porcentaje} strokeColor="#ffd700" />
            <p>No te quedes sin participar</p>
          </div>
          <div className="content-valor">
            <p>Valor de cada participacion</p>
            <h2>${price.toLocaleString()}</h2>
          </div>
          <div className="buy-buttons">
            <button
              id="buy-button1"
              onClick={() => {
                setQuantity(5);
                setProductName("Un Boleto");
              }}
            >
              Comprar 5 ${(5 * price).toLocaleString()}
            </button>
            <br />
            <button
              id="buy-button2"
              onClick={() => {
                setQuantity(10);
                setProductName("Dos Boletos");
              }}
            >
              Comprar 10 ${(10 * price).toLocaleString()}
            </button>
            <br />
            <button
              id="buy-button3"
              onClick={() => {
                setQuantity(15);
                setProductName("Cinco Boletos");
              }}
            >
              Comprar 15 $ {(15 * price).toLocaleString()}
            </button>
          </div>
          <div>
            {preferenceId && quantity !== "" && (
              <Wallet initialization={{ preferenceId: preferenceId }} />
            )}
          </div>
          <div className="content-deseas-mas">
            <p>
              Si deseas adquirir más, por favor escribe la cantidad que deseas
            </p>
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
              id="buy-button4"
              onClick={() => {
                setQuantity(customQuantity);
                setProductName(` ${quantity} Boletos`);
                handleBuyTicket();
              }}
            >
              Comprar
              {customQuantity
                ? " " +
                  customQuantity +
                  " " +
                  "$" +
                  (customQuantity * price).toLocaleString()
                : ""}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
