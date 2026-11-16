
import { useState, useEffect, useMemo } from "react";

import {
  getMonsters,
  getMonsterByIndex
} from "../services/dndApi";

import MonsterCard from "../components/MonsterCard";

const PAGE_SIZE = 12;

function Bestiary() {

  const [monsters, setMonsters] = useState([]);
  const [monsterDetails, setMonsterDetails] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [error, setError] = useState("");

  const [selectedMonster, setSelectedMonster] = useState(null);

  // 1. Consultar el listado de monstruos
  useEffect(() => {

    async function loadMonsters() {

      try {
        setLoading(true);
        setError("");

        const data = await getMonsters();

        setMonsters(data);

      } catch (error) {

        console.error(error);

        setError(
          "No fue posible cargar los monstruos. Intenta nuevamente."
        );

      } finally {

        setLoading(false);

      }
    }

    loadMonsters();

  }, []);

  // 2. Buscar monstruos por nombre
  const filteredMonsters = useMemo(() => {

    return monsters.filter((monster) =>
      monster.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  }, [monsters, searchTerm]);

  // 3. Calcular paginación
  const totalPages = Math.ceil(
    filteredMonsters.length / PAGE_SIZE
  );

  const visibleMonsters = useMemo(() => {

    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredMonsters.slice(
      start,
      start + PAGE_SIZE
    );

  }, [filteredMonsters, currentPage]);

  // 4. Obtener estadísticas de los monstruos visibles
  useEffect(() => {

    let cancelled = false;

    async function loadMonsterDetails() {

      if (visibleMonsters.length === 0) {
        setMonsterDetails([]);
        setLoadingDetails(false);
        return;
      }

      try {

        setLoadingDetails(true);

        const details = await Promise.all(
          visibleMonsters.map((monster) =>
            getMonsterByIndex(monster.index)
              .catch((error) => {
                console.error(error);
                return null;
              })
          )
        );

        if (!cancelled) {

          setMonsterDetails(
            details.filter(Boolean)
          );

        }

      } finally {

        if (!cancelled) {
          setLoadingDetails(false);
        }

      }
    }

    loadMonsterDetails();

    return () => {
      cancelled = true;
    };

  }, [visibleMonsters]);

  // 5. Cambiar búsqueda
  function handleSearch(event) {

    setSearchTerm(event.target.value);

    setCurrentPage(1);

    setSelectedMonster(null);

  }

  // 6. Cambiar página
  function changePage(page) {

    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedMonster(null);
    }

  }

  // 7. Estado de carga inicial
  if (loading) {

    return (
      <main className="page-content">
        <section className="loading-panel">
          <span>Criatura</span>
          <h2>Invocando criaturas...</h2>
          <p>Conectando con el bestiario de D&D.</p>
        </section>
      </main>
    );

  }

  // 8. Error de conexión
  if (error) {

    return (
      <main className="page-content">
        <section className="placeholder-panel">
          <h2>Ha ocurrido un error</h2>
          <p>{error}</p>

          <button
            className="primary-button"
            onClick={() => window.location.reload()}
          >
            Intentar nuevamente
          </button>
        </section>
      </main>
    );

  }

  return (

    <main className="page-content">

      {/* ENCABEZADO */}

      <section className="page-header">

        <span className="eyebrow">
          COMPENDIO DE CRIATURAS
        </span>

        <h1>Bestiario</h1>

        <p>
          Explora los monstruos y enemigos
          disponibles en Dungeons & Dragons 5e.
        </p>

      </section>

      {/* BUSCADOR */}

      <div className="search-container">

        <span>Buscar</span>

        <input
          type="text"
          placeholder="Buscar monstruos por nombre..."
          value={searchTerm}
          onChange={handleSearch}
        />

      </div>

      {/* CONTADOR */}

      <div className="bestiary-info">

        <span>
          {filteredMonsters.length} criaturas encontradas
        </span>

        <span>
          Página {currentPage} de {Math.max(totalPages, 1)}
        </span>

      </div>

      {/* LISTADO */}

      {filteredMonsters.length === 0 ? (

        <div className="placeholder-panel">
          <span className="placeholder-icon">Buscar</span>
          <h2>No encontramos criaturas</h2>
          <p>
            Intenta buscar con otro nombre.
          </p>
        </div>

      ) : (

        <>

          {loadingDetails && (
            <p className="details-loading">
              Cargando estadísticas de las criaturas...
            </p>
          )}

          <div className="monster-grid">

            {monsterDetails.map((monster) => (

              <MonsterCard
                key={monster.index}
                monster={monster}
                onClick={setSelectedMonster}
              />

            ))}

          </div>

          {/* PAGINACIÓN */}

          <div className="pagination">

            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Anterior
            </button>

            <span>{currentPage} / {totalPages}</span>

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente →
            </button>

          </div>

        </>

      )}

      {/* DETALLES DEL MONSTRUO */}

      {selectedMonster && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedMonster(null)}
        >

          <section
            className="monster-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedMonster(null)}
            >
              ✕
            </button>

            <span className="eyebrow">
              INFORMACIÓN DE LA CRIATURA
            </span>

            <h2>{selectedMonster.name}</h2>

            <p className="modal-description">
              {selectedMonster.size} ·{" "}
              {selectedMonster.type}
            </p>

            <div className="modal-stats">

              <div>
                <small>Clase de Armadura</small>
                <strong>
                  {selectedMonster.armor_class?.[0]?.value ?? "N/D"}
                </strong>
              </div>

              <div>
                <small>Puntos de Golpe</small>
                <strong>
                  {selectedMonster.hit_points ?? "N/D"}
                </strong>
              </div>

              <div>
                <small>Nivel de Desafío</small>
                <strong>
                  {selectedMonster.challenge_rating ?? "N/D"}
                </strong>
              </div>

              <div>
                <small>Experiencia</small>
                <strong>
                  {selectedMonster.xp ?? "N/D"} XP
                </strong>
              </div>

            </div>

            <h3>Características</h3>

            <p>
              Alineamiento: {selectedMonster.alignment || "No especificado"}
            </p>

            <p>
              Velocidad: {selectedMonster.speed?.walk || "No especificada"}
            </p>

            <p>
              Dados de golpe: {selectedMonster.hit_dice || "N/D"}
            </p>

            {selectedMonster.desc?.length > 0 && (
              <>
                <h3>Descripción</h3>
                {selectedMonster.desc.map((description, index) => (
                  <p key={index}>{description}</p>
                ))}
              </>
            )}

            <h3>Acciones</h3>

            {selectedMonster.actions?.length > 0 ? (

              selectedMonster.actions.map((action, index) => (

                <div className="monster-action" key={index}>
                  <strong>{action.name}</strong>
                  <p>{action.desc}</p>
                </div>

              ))

            ) : (

              <p>No hay acciones registradas.</p>

            )}

          </section>

        </div>

      )}

    </main>

  );

}

export default Bestiary;
