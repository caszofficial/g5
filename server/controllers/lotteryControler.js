// controllers/lotteryController.js
import db from "../firebaseConfig.js";

const totalNumerosPosibles = 100000;

// Generar todos los números posibles desde '00000' a '99999'
const generarTodosLosNumeros = () => {
  const numeros = [];
  for (let i = 0; i < totalNumerosPosibles; i++) {
    numeros.push(i.toString().padStart(5, "0"));
  }
  return numeros;
};

// Mezclar un arreglo de números
const mezclarNumeros = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Obtener números ya generados desde Firestore
const getNumerosYaGenerados = async () => {
  const numerosRef = db.collection("numerosGenerados");
  const data = await numerosRef.get();
  const allNumbers = data.docs.flatMap((doc) => doc.data().numeros || []);
  return new Set(allNumbers);
};

// Generar números de lotería únicos
const generarNumerosLoteria = async (cantidad) => {
  const todosLosNumeros = generarTodosLosNumeros();
  const numerosYaGenerados = await getNumerosYaGenerados();

  if (numerosYaGenerados.size >= totalNumerosPosibles) {
    throw new Error("Todos los números posibles ya han sido generados.");
  }

  let posiblesNumeros = todosLosNumeros.filter(
    (numero) => !numerosYaGenerados.has(numero)
  );

  posiblesNumeros = mezclarNumeros(posiblesNumeros);
  return posiblesNumeros.slice(0, cantidad);
};

// Guardar datos en la colección 'ventas' y actualizar en 'numerosGenerados'
const createData = async (name, email, phone, address, numerosRecientes) => {
  try {
    await db.collection("ventas").add({
      name,
      email,
      phone,
      address,
      numbers: numerosRecientes,
    });

    await db.collection("numerosGenerados").add({ numeros: numerosRecientes });
    return { success: true, numerosRecientes };
  } catch (error) {
    console.error("Error al guardar datos:", error);
    return { success: false, error };
  }
};

// Controlador para manejar la generación de números y guardado de datos
export const handleLotteryRequest = async (req, res) => {
  const { name, email, phone, address, cantidad } = req.body;

  try {
    const numerosRecientes = await generarNumerosLoteria(cantidad);
    const resultado = await createData(name, email, phone, address, numerosRecientes);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
