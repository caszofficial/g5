// app.js
import express from "express";
import lotteryRoutes from "./routes/lotteryRoutes.js";
import mpRoutes from "./routes/mpRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", lotteryRoutes);
app.use("/api/mercadopago", mpRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
