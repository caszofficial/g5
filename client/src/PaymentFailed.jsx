import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const PaymentFailed = () => {
  return (
    <div className="payment-failed-main-container">
      <Header />
      <div className="payment-failed-container">
        <p className="error">ERROR</p>
        <p>Lo sentimos</p>
        <p>No pudimos procesar tu pago</p>
        <p>Por favor intentalo nuevamente.</p>
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
