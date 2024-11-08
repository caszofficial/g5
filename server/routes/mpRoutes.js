// routes/mpRoutes.js
import express from "express";
import { createPreference } from "../controllers/mpController.js"; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para crear la preferencia de pago
router.post("/create_preference", createPreference);

export default router;
