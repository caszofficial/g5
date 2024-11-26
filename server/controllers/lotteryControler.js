// controllers/lotteryController.js
import db from "../firebaseConfig.js";

const totalNumerosPosibles = 100000;


export const obtenerPorcentajeNumerosGenerados = async (req, res) => {
  try {
    const numerosRef = db.collection("numerosGenerados");
    const data = await numerosRef.get();

    // Contar la cantidad total de números generados
    const totalNumerosGenerados = data.docs.reduce((total, doc) => {
      return total + (doc.data().numeros ? doc.data().numeros.length : 0);
    }, 0);

    const porcentaje = (totalNumerosGenerados / totalNumerosPosibles) * 100;

    res.status(200).json({ success: true, porcentaje });
  } catch (error) {
    console.error("Error al obtener el porcentaje de números generados:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


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
    const batch = db.batch();
    const ventasRef = db.collection("ventas").doc();
    const numerosGeneradosRef = db.collection("numerosGenerados").doc();

    // Añadir a la colección "ventas"
    batch.set(ventasRef, {
      name,
      email,
      phone,
      address,
      numbers: numerosRecientes,
    });

    // Validar y guardar números únicos en una transacción atómica
    await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(db.collection("numerosGenerados"));
      const yaGenerados = new Set(
        snapshot.docs.flatMap((doc) => doc.data().numeros || [])
      );

      // Verificar si los números ya existen
      for (const numero of numerosRecientes) {
        if (yaGenerados.has(numero)) {
          throw new Error(
            `El número ${numero} ya fue generado por otro usuario.`
          );
        }
      }

      // Añadir los números a la colección "numerosGenerados"
      batch.set(numerosGeneradosRef, { numeros: numerosRecientes });
    });

    // Aplicar el batch
    await batch.commit();

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
