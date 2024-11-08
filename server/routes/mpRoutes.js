// routes/mercadoPagoRoutes.js
import express from "express";
import {createPreference} from "../controllers/mpController"

const router = express.Router();

// Ruta para crear la preferencia de pago en MercadoPago
router.post("/create_preference", createPreference);

export default router;
