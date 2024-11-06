import { MercadoPagoConfig, Preference } from "mercadopago";
import express from "express";
import cors from "cors";

const client = new MercadoPagoConfig({
  accessToken: "TEST-ACCESS-TOKEN",
});

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// Simula una base de datos en memoria para la asignación temporal de números
let temporaryReservations = {};

// Ruta para crear una preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const { title, quantity, price, userInfo } = req.body;
    const assignedNumbers = generateUniqueNumbers(quantity); // Lógica para generar números únicos

    // Reservamos temporalmente estos números en el backend
    const reservationId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    temporaryReservations[reservationId] = { assignedNumbers, userInfo };

    const body = {
      items: [
        { title, quantity, unit_price: price, currency_id: "COP" },
      ],
      back_urls: {
        success: `http://localhost:5173/payment_confirmed?reservationId=${reservationId}`,
        failure: "http://localhost:5173/payment_failed",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({ id: result.id, reservationId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});

// Ruta de confirmación del pago para asignar números definitivamente
app.post("/payment_confirmation", async (req, res) => {
  const { reservationId } = req.body;

  if (temporaryReservations[reservationId]) {
    const { assignedNumbers, userInfo } = temporaryReservations[reservationId];
    delete temporaryReservations[reservationId];

    // Aquí guardamos en la base de datos los números definitivamente asignados al usuario
    await addDoc(collection(firebase, "ventas"), {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address,
      numbers: assignedNumbers,
    });

    res.status(200).json({ assignedNumbers });
  } else {
    res.status(400).json({ error: "Reserva no encontrada" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Lógica para generar números únicos
function generateUniqueNumbers(quantity) {
  const uniqueNumbers = [];
  for (let i = 0; i < quantity; i++) {
    const num = Math.floor(100000 * Math.random()).toString().padStart(5, '0');
    uniqueNumbers.push(num);
  }
  return uniqueNumbers;
}
