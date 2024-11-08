// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccount from "./path/to/serviceAccountKey.json" assert { type: "json" };

// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken:
    "TEST-2966235563486541-102919-6baf7e692bb2837d6a9ab2b9fcb1db31-187785634",
});


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const numeros = admin.firestore().collection("numerosGenerados");

let todosLosNumeros = [];
let numerosYaGenerados = new Set()

const generarTodosLosNumeros = () => {
  const numeros = [];
  for (let i = 0; i < totalNumerosPosibles; i++) {
    numeros.push(i.toString().padStart(5, "0")); // Genera 00000, 00001, ..., 99999
  }
  return numeros
};

const getNumbers = async () => {
  try {
    const data = await numeros.get(); // Recuperar documentos de 'numerosGenerados'
    const allNumbers = data.docs.flatMap((doc) => doc.data().numeros || []); // Obtener todos los arreglos 'numeros' de cada documento
    return new Set(allNumbers); // Devolver los números únicos como un Set
  } catch (error) {
    console.error("Error al obtener números:", error);
  }
};

const mezclarNumeros = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};





const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
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
