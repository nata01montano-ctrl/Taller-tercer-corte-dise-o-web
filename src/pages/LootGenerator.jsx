
import { useState } from "react";

import {
  generateLoot
} from "../services/lootGenerator";

import LootCard from "../components/LootCard";

function LootGenerator() {

  const [challengeRating, setChallengeRating] = useState("1");

  const [loot, setLoot] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Generar recompensas
  async function handleGenerateLoot() {

    try {

      setLoading(true);
      setError("");
      setLoot(null);

      const result = await generateLoot(
        Number(challengeRating)
      );

      setLoot(result);

    } catch (error) {

      console.error(error);

      setError(
        "No fue posible generar el botín. Comprueba tu conexión e inténtalo nuevamente."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="page-content">

      {/* ENCABEZADO */}

      <section className="page-header">

        <span className="eyebrow">
          RECOMPENSAS Y TESOROS
        </span>

        <h1>Generador de Loot</h1>

        <p>
          Genera recompensas aleatorias para los
          aventureros después de cada batalla.
        </p>

      </section>

      {/* CONFIGURACIÓN */}

      <section className="loot-config">

        <div className="loot-config-icon">
          botin
        </div>

        <div className="loot-config-content">

          <h2>Configurar recompensa</h2>

          <p>
            Selecciona el nivel de desafío del enemigo derrotado.
          </p>

          <label htmlFor="challengeRating">
            Nivel de desafío (Challenge Rating)
          </label>

          <select
            id="challengeRating"
            value={challengeRating}
            onChange={(event) =>
              setChallengeRating(event.target.value)
            }
          >

            <option value="0.125">CR 1/8</option>
            <option value="0.25">CR 1/4</option>
            <option value="0.5">CR 1/2</option>
            <option value="1">CR 1</option>
            <option value="2">CR 2</option>
            <option value="3">CR 3</option>
            <option value="4">CR 4</option>
            <option value="5">CR 5</option>
            <option value="7">CR 7</option>
            <option value="10">CR 10</option>
            <option value="13">CR 13</option>
            <option value="17">CR 17</option>
            <option value="20">CR 20</option>

          </select>

          <button
            className="generate-button"
            onClick={handleGenerateLoot}
            disabled={loading}
          >
            {loading
              ? "Generando tesoro..."
              : "Generar botín"}
          </button>

        </div>

      </section>

      {/* ERROR */}

      {error && (

        <div className="loot-error">
          Error: {error}
        </div>

      )}

      {/* CARGA */}

      {loading && (

        <div className="loading-panel">
          <span>Cofre</span>
          <h2>Abriendo el cofre...</h2>
          <p>Buscando recompensas en el tesoro.</p>
        </div>

      )}

      {/* RESULTADOS */}

      {loot && !loading && (

        <section className="loot-results">

          <div className="loot-results-header">

            <div>
              <span className="eyebrow">
                TESORO GENERADO
              </span>

              <h2>¡Recompensas obtenidas!</h2>
            </div>

            <span className="loot-tier">
              {loot.tier}
            </span>

          </div>

          {/* MONEDAS */}

          <h3 className="loot-section-title">
            Monedas encontradas
          </h3>

          <div className="coins-grid">

            <div className="coin-card copper">
              <span>cobre</span>
              <strong>{loot.coins.copper}</strong>
              <small>Monedas de cobre</small>
            </div>

            <div className="coin-card silver">
              <span>plata</span>
              <strong>{loot.coins.silver}</strong>
              <small>Monedas de plata</small>
            </div>

            <div className="coin-card gold">
              <span>oro</span>
              <strong>{loot.coins.gold}</strong>
              <small>Monedas de oro</small>
            </div>

            <div className="coin-card platinum">
              <span>platino</span>
              <strong>{loot.coins.platinum}</strong>
              <small>Monedas de platino</small>
            </div>

          </div>

          {/* OBJETOS */}

          <h3 className="loot-section-title">
             Objetos encontrados
          </h3>

          {loot.items.length > 0 ? (

            <div className="loot-items-grid">

              {loot.items.map((item, index) => (

                <LootCard
                  key={`${item.index}-${index}`}
                  item={item}
                />

              ))}

            </div>

          ) : (

            <div className="placeholder-panel">
              <span className="placeholder-icon">objeto</span>
              <h2>No se encontraron objetos</h2>
              <p>
                El cofre contiene únicamente monedas.
                Puedes generar otra recompensa.
              </p>
            </div>

          )}

          {/* NUEVO BOTÍN */}

          <button
            className="generate-button regenerate-button"
            onClick={handleGenerateLoot}
          >
            Generar nuevas recompensas
          </button>

        </section>

      )}

    </main>

  );

}

export default LootGenerator;
