// routes/lotteryRoutes.js
import express from "express";
import {
  handleLotteryRequest,
  obtenerPorcentajeNumerosGenerados,
} from "../controllers/lotteryControler.js";

const router = express.Router();

// Ruta para generar números de lotería y guardar en Firebase
router.post("/generar-numeros", handleLotteryRequest);
router.get("/porcentaje", obtenerPorcentajeNumerosGenerados);

export default router;
