// app.js
import express from "express";
import lotteryRoutes from "./routes/lotteryRoutes.js";
import mpRoutes from "./routes/mpRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: "https://g5-tawny.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
}));
app.use(express.json());

// Rutas
app.use("/api", lotteryRoutes);
app.use("/api/mercadopago", mpRoutes);

app.options("/api/mercadopago/create_preference", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://g5-tawny.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
