import "./App.css";
import React, { useState, useEffect } from "react";
import Tarea from "./Tarea";

function App() {
  // 🧠 Estado inicial (se carga desde localStorage)
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  

    // 🔢 Cálculos
  const totalTareas = tareas.length;

  const tareasCompletadas = tareas.filter(
    tarea => tarea.completada
  ).length;

  const porcentaje =
    totalTareas === 0
      ? 0
      : Math.round((tareasCompletadas / totalTareas) * 100);
      console.log("Porcentaje actual:", porcentaje);


  const [nuevaTarea, setNuevaTarea] = useState("");
  const [filtro, setFiltro] = useState("todas"); // Estado del filtro

  // 💾 Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  // ➕ Agregar tarea
  const agregarTarea = () => {
    if (nuevaTarea.trim() !== "") {
      const nueva = {
        id: Date.now(),
        texto: nuevaTarea,
        completada: false,
      };
      setTareas([...tareas, nueva]);
      setNuevaTarea("");
    }
  };

// ❌ Eliminar tarea (con confirmación)
const eliminarTarea = (id) => {
  const confirmar = window.confirm("¿Seguro que deseas eliminar esta tarea?");
  if (confirmar) {
    setTareas(tareas.filter((t) => t.id !== id));
  }
};


  // ✅ Marcar como completada o pendiente
  const toggleCompletada = (id) => {
    setTareas((prevTareas) =>
      prevTareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  // 🧮 Filtrado dinámico
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "completadas") return t.completada;
    if (filtro === "pendientes") return !t.completada;
    return true; // "todas"
  });

  // 💬 Mensaje condicional si no hay tareas
  const mensajeVacio =
    tareasFiltradas.length === 0 ? "No hay tareas en esta vista." : "";

  return (
    <div className="container">
      <h1 className="titulo">Lista de tareas ✅</h1>

      <div className="input-container">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button className="boton-agregar" onClick={agregarTarea}>
          Agregar
        </button>
      </div>

      {/* 🔵 BOTONES DE FILTRO */}
      <div className="filtros">
        <button
          className={filtro === "todas" ? "activo" : ""}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          className={filtro === "completadas" ? "activo" : ""}
          onClick={() => setFiltro("completadas")}
        >
          Completadas
        </button>
        <button
          className={filtro === "pendientes" ? "activo" : ""}
          onClick={() => setFiltro("pendientes")}
        >
          Pendientes
        </button>
      </div>
      
      <p>Progreso del día: {porcentaje} %</p>


      {/* 🧩 LISTA DE TAREAS */}
      {mensajeVacio ? (
        <p>{mensajeVacio}</p>
      ) : (
        <ul className="lista">
          {tareasFiltradas.map((tarea) => (
            <Tarea
              key={tarea.id}
              tarea={tarea}
              onEliminar={eliminarTarea}
              onToggle={toggleCompletada}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
