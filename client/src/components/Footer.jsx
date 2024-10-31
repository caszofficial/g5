import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        backgroundColor: "#2e86c1",
        color: "#FFD700",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div>
        <ul style={{listStyle:"none", textAlign:"center"}}>
          <li style={{margin:"4px"}}>SDS</li>
          <li style={{margin:"4px"}}>CR 43A #7-50</li>
          <li style={{margin:"4px"}}>+573001112233</li>
        </ul>
      </div>
      <div>
        <h1>LOGO</h1>
      </div>
    </footer>
  );
};

export default Footer;
