import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [numerosYaGenerados, setNumerosYaGenerados] = useState(new Set()); // Usamos Set para mayor eficiencia
  const [numerosRecientes, setNumerosRecientes] = useState([]); // Números generados en la última ejecución
  const totalNumerosPosibles = 100000; // Total de números posibles (00000 a 99999)
  const [cantidad, setCantidad] = useState(0);

  // Creamos un arreglo de todos los números posibles desde '00000' a '99999'
  const [todosLosNumeros, setTodosLosNumeros] = useState([]);

  useEffect(() => {
    // Inicializa todos los números posibles al cargar el componente (solo una vez)
    const generarTodosLosNumeros = () => {
      const numeros = [];
      for (let i = 0; i < totalNumerosPosibles; i++) {
        numeros.push(i.toString().padStart(5, "0")); // Genera 00000, 00001, ..., 99999
      }
      setTodosLosNumeros(numeros);
    };

    generarTodosLosNumeros();
  }, []);

  // Mezcla el arreglo de números posibles (Fisher-Yates Shuffle)
  const mezclarNumeros = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Función para generar una cantidad específica de números
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

  return (
    <>
      <p>Total de números generados: {numerosYaGenerados.size}</p>
      <h1>Generador de Números de Lotería</h1>
      <input
        type="text"
        onChange={(e) => setCantidad(e.target.value)}
        value={cantidad}
        min="1"
        max={totalNumerosPosibles - numerosYaGenerados.size}
      />
      <button onClick={() => generarNumerosLoteria(cantidad)}>
        Generar {cantidad} Números
      </button>

      {/* Mostrar los números generados en esta ejecución */}
      {numerosRecientes.length > 0 && <p>{numerosRecientes.join(" - ")}</p>}

      {/* Mostrar el total de números generados hasta el momento */}
    </>
  );
}

export default App;
