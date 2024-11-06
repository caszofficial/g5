import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentConfirmation = () => {
  const [assignedNumbers, setAssignedNumbers] = useState([]);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reservationId = queryParams.get("reservationId");

    const confirmPayment = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/payment_confirmation",
          {
            reservationId,
          }
        );

        setAssignedNumbers(response.data.assignedNumbers);
        setUserData(response.data.userData); // Aquí se obtiene los datos del usuario desde el backend
      } catch (error) {
        console.error("Error en la confirmación:", error);
        alert("Error en la confirmación del pago.");
        navigate("/"); // Redirige al inicio si hay error
      }
    };

    if (reservationId) {
      confirmPayment();
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>Pago confirmado</h2>
      {userData && (
        <div>
          <p>Nombre: {userData.name}</p>
          <p>Correo: {userData.email}</p>
        </div>
      )}
      <p>Tus números asignados son:</p>
      {assignedNumbers.length > 0 ? (
        <p>{assignedNumbers.join(" - ")}</p>
      ) : (
        <p>Esperando confirmación...</p>
      )}
    </div>
  );
};

export default PaymentConfirmation;
