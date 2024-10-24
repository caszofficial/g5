import React from "react";

const Content = () => {
  return (
    <div>
      <h1>Titulo Sorteo</h1>
      <div style={{ marginBottom: "20px" }}>
        <img src="iamgen sorteo" alt="" height="300px" width="80%" />
      </div>
      <div
        style={{
          margin: "20px",
        }}
      >
        <button
          style={{
            width: "80%",
            margin: "5px",
            border: "none",
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            fontSize:"20px"
          }}
        >
          Comprar 1
        </button>
        <br />
        <button
          style={{
            width: "80%",
            margin: "5px",
            border: "none",
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            fontSize:"20px"
          }}
        >
          Comprar 2
        </button>
        <br />
        <button
          style={{
            width: "80%",
            margin: "5px",
            border: "none",
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            fontSize:"20px"
          }}
        >
          Comprar 3
        </button>
      </div>
      <input
        type="number"
        // onChange={(e) => setCantidad(Number(e.target.value))}
        // value={cantidad || ""}
        // max={totalNumerosPosibles - numerosYaGenerados.size}
        placeholder="Comprar Mas Numeros"
        style={{
          border: "none",
          height: "20px",
          width: "80%",
          backgroundColor: "#f1f1f1",
          padding: "10px",
          borderRadius: "10px",
          marginBottom:"5px",
          fontSize:"20px"
        }}
      />
      <br />
      <button type="submit" style={{
            width: "80%",
            margin: "5px",
            border: "none",
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontSize:"20px"
          }}>Comprar</button>
    </div>
  );
};

export default Content;
