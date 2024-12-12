import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/sds-main-29a46.firebasestorage.app/o/images%2FSDS_Logo_blanco.png?alt=media&token=19b2e59e-da04-40fc-b67e-f9a1c25fb529"
          alt="No image Found"
          onClick={() =>
            navigate(import.meta.env === "prod" ? "https://sds.com" : "/")
          }
        />
      </div>
    </div>
  );
};

export default Header;
