import { useState, useEffect } from "react";
import "./App.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import firebase from "./firebase/firebase";

function App() {
  const [numerosYaGenerados, setNumerosYaGenerados] = useState(new Set()); // Usamos Set para mayor eficiencia
  const [numerosRecientes, setNumerosRecientes] = useState([]); // Números generados en la última ejecución
  const totalNumerosPosibles = 100000; // Total de números posibles (00000 a 99999)
  const [cantidad, setCantidad] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Referencia a la colección de Firebase
  const datos = collection(firebase, "ventas");
  const numeros = collection(firebase, "numerosGenerados");

  // Inicializa todos los números posibles al cargar el componente
  const [todosLosNumeros, setTodosLosNumeros] = useState([]);

  useEffect(() => {
    // Generar todos los números posibles desde '00000' a '99999'
    const generarTodosLosNumeros = () => {
      const numeros = [];
      for (let i = 0; i < totalNumerosPosibles; i++) {
        numeros.push(i.toString().padStart(5, "0")); // Genera 00000, 00001, ..., 99999
      }
      setTodosLosNumeros(numeros);
    };

    generarTodosLosNumeros();
    getNumbers(); // Cargar números existentes de Firebase al inicio
  }, []);

  // Función para recuperar números ya generados desde Firebase
  const getNumbers = async () => {
    const data = await getDocs(numeros); // Recuperar documentos de 'numerosGenerados'
    const allNumbers = data.docs.flatMap((doc) => doc.data().numeros || []); // Obtener todos los arreglos 'numeros' de cada documento
    setNumerosYaGenerados(new Set(allNumbers)); // Actualizar el estado con todos los números únicos
  };

  // Función para generar números de lotería
  const generarNumerosLoteria = (cantidad) => {
    if (numerosYaGenerados.size >= totalNumerosPosibles) {
      alert("Todos los números posibles ya han sido generados.");
      return;
    }

    const nuevosNumeros = [];
    let posiblesNumeros = todosLosNumeros.filter(
      (numero) => !numerosYaGenerados.has(numero)
    );

    // Mezclar los números restantes para generar aleatoriedad
    posiblesNumeros = mezclarNumeros(posiblesNumeros);

    for (let i = 0; i < cantidad && posiblesNumeros.length > 0; i++) {
      const numero = posiblesNumeros.pop(); // Extraer uno del final (eficiente)
      nuevosNumeros.push(numero);
      numerosYaGenerados.add(numero); // Añadir al conjunto de generados
    }

    setNumerosRecientes(nuevosNumeros); // Números de la última ejecución
    setNumerosYaGenerados(new Set(numerosYaGenerados)); // Actualizar el Set
  };

  // Función para mezclar un arreglo (Fisher-Yates Shuffle)
  const mezclarNumeros = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Crear datos en la colección 'ventas' y actualizar números en 'numerosGenerados'
  const createData = async (e) => {
    e.preventDefault();

    // Crear documento en la colección 'ventas'
    await addDoc(datos, {
      name: name,
      email: email,
      phone: phone,
      address: address,
      numbers: numerosRecientes, // Guardar los números generados recientes
    });

    // Actualizar los números en 'numerosGenerados'
    const docRef = collection(firebase, "numerosGenerados"); // Referencia a la colección
    await addDoc(docRef, { numeros: numerosRecientes }); // Guardar nuevos números generados
    setNumerosYaGenerados(
      new Set([...numerosYaGenerados, ...numerosRecientes])
    ); // Actualizar el estado
  };

  return (
    <>
      <form onSubmit={createData}>
        <p>Total de números generados: {numerosYaGenerados.size}</p>
        <h1>Generador de Números de Lotería</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electronico"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Numero de Telefono"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Direccion"
        />
        <input
          type="number"
          onChange={(e) => setCantidad(Number(e.target.value))}
          value={cantidad || ""}
          max={totalNumerosPosibles - numerosYaGenerados.size}
          placeholder="Cantidad de Números a Generar"
        />
        <button type="submit" onClick={() => generarNumerosLoteria(cantidad)}>
          Generar {cantidad} Números
        </button>
      </form>
      {/* Mostrar los números generados en esta ejecución */}
      {numerosRecientes.length > 0 && <p>{numerosRecientes.join(" - ")}</p>}
    </>
  );
}

export default App;
