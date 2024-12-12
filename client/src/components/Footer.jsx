import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-list">
        <ul style={{ listStyle: "none", textAlign: "center" }}>
          <li>SDS</li>
          <li>CR 43A #7-50</li>
          <li>+573001112233</li>
          <li>sdsfabricadesuenos@gmail.com</li>
        </ul>
      </div>
      <div className="footer-image">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/sds-main-29a46.firebasestorage.app/o/images%2FSDS_Logo_blanco.png?alt=media&token=19b2e59e-da04-40fc-b67e-f9a1c25fb529"
          alt="No image Found"
        />
      </div>
    </footer>
  );
};

export default Footer;
