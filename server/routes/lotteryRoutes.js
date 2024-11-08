// routes/lotteryRoutes.js
import express from "express";
import { handleLotteryRequest } from "../controllers/lotteryControler.js";

const router = express.Router();

// Ruta para generar números de lotería y guardar en Firebase
router.post("/generar-numeros", handleLotteryRequest);

export default router;
