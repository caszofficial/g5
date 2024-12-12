import { MercadoPagoConfig, Preference } from "mercadopago";
import * as dotenv from "dotenv";

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-2966235563486541-102919-6baf7e692bb2837d6a9ab2b9fcb1db31-187785634",
});

// Función para crear la preferencia de pago
export const createPreference = async (req, res) => {
  try {
    const { title, quantity, price } = req.body;

    const body = {
      items: [
        {
          title: title,
          quantity: quantity,
          unit_price: price,
          currency_id: "COP", // Ajusta la moneda según sea necesario
        },
      ],
      back_urls: {
        success:
          process.env.ENV === "prod"
            ? "https://sdslatam.com/payment_confirmed"
            : "http://localhost:5173/payment_confirmed", // URL de éxito
        failure:
          process.env.ENV === "prod"
            ? "https://sdslatam.com/payment_failed"
            : "http://localhost:5173/payment_failed", // URL de fallo
        pending:
          process.env.ENV === "prod"
            ? "https://sdslatam.com/payment_pending"
            : "http://localhost:5173/payment_pending", // URL de pendiente
      },
      auto_return: "approved", // Para que se redirija automáticamente al cliente después de una compra exitosa
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({ id: result.id }); // Retorna el ID de la preferencia
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
};
