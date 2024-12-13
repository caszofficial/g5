import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/payment_confirmed");
    }, 30000);
  }, []);
  return (
    <div className="payment-failed-main-container">
      <Header />
      <div className="payment-failed-container">
      <p>Por favor no salgas ni recargues esta página</p>
        <p>Estamos procesando tu pago</p>
        <p>
          Después de que procesemos tu pago serás redirigido automaticamente
        </p>
        <p>
          Si continuas teniendo inconvenientes puedes escribirnos a cualquiera
          de nuestros canales digitales de atencion al cliente.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentFailed;
