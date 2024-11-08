// import React, { useState } from "react";
import axios from "axios";

const DataFill = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [numerosRecientes, setNumerosRecientes] = useState([]); 
  const [cantidad, setCantidad] = useState(localStorage.getItem("cantidad") || 0);
  const [showNumbers, setShowNumbers] = useState(false);

  // Configura la función para hacer la llamada al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowNumbers(false); // Oculta los números anteriores al hacer una nueva solicitud

    try {
      // Llama a la API para generar los números
      const response = await axios.post("http://localhost:3000/api/generar-numeros", {
        name,
        email,
        phone,
        address,
        cantidad: parseInt(cantidad),
      });

      if (response.data.success) {
        setNumerosRecientes(response.data.numerosRecientes); // Guarda los números generados en el estado
        setShowNumbers(true); // Muestra los números generados
      } else {
        console.error("Error al generar números:", response.data.error);
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" required />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección" required />
        <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder="Cantidad" min="1" required />
        <button type="submit">Generar Números</button>
      </form>

      {showNumbers && (
        <div>
          <h3>Números Generados:</h3>
          <ul>
            {numerosRecientes.map((numero, index) => (
              <li key={index}>{numero}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataFill;
