import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <ul style={{ listStyle: "none", textAlign: "center" }}>
          <li>SDS</li>
          <li>CR 43A #7-50</li>
          <li>+573001112233</li>
          <li>sdsfabricadesuenos@gmail.com</li>
        </ul>
      </div>
      <div style={{ height:"50px", margin:"20px 0px"}}>
        <img
          src="../../src/assets/SDS_Logo_blanco.png"
          alt="No image Found"
          width="100%"
          height="100%"
        />
      </div>
    </footer>
  );
};

export default Footer;
