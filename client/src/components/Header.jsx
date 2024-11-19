import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      className="header"
      // style={{

      //   backgroundColor: "#2e86c1",
      //   color: "#ffd700",
      // }}
    >
      <div>
        <img
          src="../../src/assets/SDS_Logo_blanco.png"
          alt="No image Found"
          width="100%"
          height="100%"
          onClick={() =>
            navigate(
              import.meta.env === "prod"
                ? "https://sds.com"
                : "/",
              
            )
          }
        />
      </div>
    </header>
  );
};

export default Header;
