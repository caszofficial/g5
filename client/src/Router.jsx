import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import DataFill from "./DataFill";
import PaymentFailed from "./PaymentFailed";
import PaymentPending from "./PaymentPending";

const Router = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/payment_confirmed" element={<DataFill />} />
        <Route path="/payment_failed" element={<PaymentFailed />} />
        <Route path="/payment_pending" element={<PaymentPending />} />
      </Routes>
    </>
  );
};

export default Router;
