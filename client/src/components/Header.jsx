import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div>
        <img
          src="../../src/assets/SDS_Logo_blanco.png"
          alt="No image Found"
          onClick={() =>
            navigate(import.meta.env === "prod" ? "https://sds.com" : "/")
          }
        />
      </div>
    </header>
  );
};

export default Header;
