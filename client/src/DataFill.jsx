import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import emailjs from "@emailjs/browser";
import "./App.css";

const DataFill = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [numerosRecientes, setNumerosRecientes] = useState([]);
  const cantidad = localStorage.getItem("cantidad");

  const [showNumbers, setShowNumbers] = useState(true);

  // Configura la función para hacer la llamada al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowNumbers(false); // Oculta los números anteriores al hacer una nueva solicitud

    try {
      // Llama a la API para generar los números
      const response = await axios.post(
        import.meta.env.VITE_ENV === "prod"
          ? "https://g5.onrender.com/api/generar-numeros"
          : "http://localhost:3000/api/generar-numeros",
        {
          name,
          email,
          phone,
          address,
          cantidad: parseInt(cantidad),
        }
      );

      console.log(response);

      if (response.data.success) {
        const numerosGenerados = response.data.numerosRecientes;

        setNumerosRecientes(numerosGenerados); // Guarda los números generados en el estado
        setShowNumbers(true); // Muestra los números generados
        localStorage.removeItem("cantidad");
      } else {
        console.error("Error al generar números:", response.data.error);
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
    }
  };

  useEffect(() => {
    if (numerosRecientes.length > 0) {
      let templateParams = {
        to_name: name,
        numbers: numerosRecientes.join(", "),
        to_email: email,
        from_name: "SDS",
        phone: phone,
      };

      emailjs
        .send("service_09dyxrg", "template_cdo057w", templateParams, {
          publicKey: "MVhXrcFqOLzrZJiWt",
        })
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
    } else {
      console.log("hola");
    }
  }, [numerosRecientes]);

  return (
    <div className="datafill">
      <Header />
      {!showNumbers ? (
        <div className="datafill-content">
          <div className="datafill-thanks">
            <p>
              Gracias por tu compra. Completa tus datos para que recibas tus
              números, también serán enviados al correo electrónico que usaste.
            </p>
          </div>

          <div className="datafill-img">
            <img
              src="https://acroadtrip.blob.core.windows.net/catalogo-imagenes/l/RT_V_2e3dce5a6a514052a8f3236f33acfe1c.jpg"
              alt=""
            />
          </div>
          <form id="form" onSubmit={handleSubmit} className="datafill-form">
            <div className="datafill-thanks-pc">
              <p>
                Gracias por tu compra. Completa tus datos para que recibas tus
                números, también serán enviados al correo electrónico que
                usaste.
              </p>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electronico"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Numero de Telefono"
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Direccion"
            />
            <button type="submit">Generar números</button>
          </form>
          <div className="datafill-img-pc">
            <img
              src="https://acroadtrip.blob.core.windows.net/catalogo-imagenes/l/RT_V_2e3dce5a6a514052a8f3236f33acfe1c.jpg"
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="datafill-shownumbers">
          <p className="shownumbers-text">
            Recuerda que se juega al venderse la totalidad de los números
            <br />
            De esa manera nos aseguramos de que siempre tengamos un feliz
            ganador!
            <br />
            Asi que guardalos muy bien!
          </p>
          <div className="numeros-container">
            {numerosRecientes.length > 0 ? (
              numerosRecientes.map((n) => <p className="numeros">{n}</p>)
            ) : (
              <>
                <p className="numeros">12345</p>
                <p className="numeros">12345</p>
                <p className="numeros">12345</p>
                <p className="numeros">12345</p>
                <p className="numeros">12345</p>
              </>
            )}
          </div>

          <p className="shownumbers-text">Mucha Suerte!</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DataFill;
