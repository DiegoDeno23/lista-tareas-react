import React from "react";

function Tarea({ tarea, onEliminar, onToggle }) {
  return (
    <li
      className={`tarea ${tarea.completada ? "completada" : ""}`}
      onClick={() => onToggle(tarea.id)}
    >
      {tarea.texto}
      <button
        className="boton-eliminar"
        onClick={(e) => {
          e.stopPropagation();
          onEliminar(tarea.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

export default Tarea;
