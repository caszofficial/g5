// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import express from "express";
import cors from "cors";
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: "TEST-2966235563486541-102919-6baf7e692bb2837d6a9ab2b9fcb1db31-187785634" });

// const preference = new Preference(client);

// preference
//   .create({
//     body: {
//       items: [
//         {
//           title: "Mi producto",
//           quantity: 1,
//           unit_price: 5000,
//         },
//       ],
//       back_urls: {
//         success: "",
//         failure: "",
//         pending: "",
//       },
//     },
//   })
//   .then(console.log)
//   .catch(console.log);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/",  (req, res) => {
  res.send(`Server runing in port ${port}`);
});

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: req.body.quantity,
          unit_price: req.body.price,
          currency_id: "COP",
        },
      ],
      back_urls: {
        success: "http://localhost:5173/payment_confirmed",
        failure: "",
        pending: "",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});

app.listen(port, () => {
  console.log(`Server runing in port ${port}`);
});
