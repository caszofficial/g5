const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Función para crear la pausa

const inicializarNumeros = async () => {
  const numerosDisponibles = [];

  for (let i = 0; i < 100000; i++) {
    const numero = i.toString().padStart(5, "0");
    numerosDisponibles.push(numero);
  }

  const collectionRef = db
    .collection("numeros")
    .doc("numerosDisponibles")
    .collection("disponibles");

  let batch = db.batch();
  const batchSize = 500;

  for (let i = 0; i < numerosDisponibles.length; i++) {
    const numero = numerosDisponibles[i];
    const docRef = collectionRef.doc(numero); // Cada número será el ID del documento
    batch.set(docRef, { numero });

    if (i % batchSize === 0 && i !== 0) {
      await batch.commit(); // Commit del lote actual
      console.log(`Lote ${i / batchSize} escrito.`);
      batch = db.batch(); // Reiniciamos el lote

      await delay(1000); // Esperamos 1 segundo entre cada batch
    }
  }

  // Escribir el último lote si es necesario
  if (numerosDisponibles.length % batchSize !== 0) {
    await batch.commit();
    console.log(`Último lote escrito.`);
  }

  console.log("Todos los números han sido inicializados en Firestore.");
};

inicializarNumeros().catch(console.error);
