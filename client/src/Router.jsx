import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import DataFill from "./DataFill";

const Router = () => {
  return (
    <>

      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/payment_confirmed" element={<DataFill />} />
        {/* <Route path="/shownumbers" element={<ShowNumbers />} /> */}
      </Routes>
    </>
  );
};

export default Router;
