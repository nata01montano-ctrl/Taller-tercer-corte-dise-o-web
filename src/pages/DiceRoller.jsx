
import { useState } from "react";
import DiceCard from "../components/DiceCard";

const diceOptions = [
  { name: "D4", faces: 4, icon: "" },
  { name: "D6", faces: 6, icon: "" },
  { name: "D8", faces: 8, icon: "" },
  { name: "D10", faces: 10, icon: "" },
  { name: "D12", faces: 12, icon: "" },
  { name: "D20", faces: 20, icon: "" },
  { name: "D100", faces: 100, icon: "" }
];

function DiceRoller() {
  const [selectedDice, setSelectedDice] = useState(diceOptions[5]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [rolling, setRolling] = useState(false);

  function rollDice() {
    if (rolling) return;

    setRolling(true);
    setResult(null);

    // Simula una animación de lanzamiento.
    setTimeout(() => {
      const value =
        Math.floor(Math.random() * selectedDice.faces) + 1;

      setResult(value);

      setHistory((previousHistory) => [
        {
          id: Date.now(),
          dice: selectedDice.name,
          result: value
        },
        ...previousHistory
      ].slice(0, 10));

      setRolling(false);
    }, 700);
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <main className="page-content dice-page">
      <section className="page-header">
        <span className="eyebrow">AZAR Y AVENTURA</span>
        <h1>Bandeja de Dados</h1>
        <p>
          Selecciona tus dados, lánzalos y deja que el destino
          decida el resultado de tu aventura.
        </p>
      </section>

      <section className="dice-selection">
        <div className="dice-section-header">
          <div>
            <span className="eyebrow">SELECCIONA TU DADO</span>
            <h2>Dados disponibles</h2>
          </div>
        </div>

        <div className="dice-grid">
          {diceOptions.map((dice) => (
            <DiceCard
              key={dice.name}
              dice={dice}
              selected={selectedDice.name === dice.name}
              onClick={() => {
                setSelectedDice(dice);
                setResult(null);
              }}
            />
          ))}
        </div>
      </section>

      <section className="dice-rolling-panel">
        <span className="eyebrow">TU LANZAMIENTO</span>

        <h2>
          Lanzando un {selectedDice.name}
        </h2>

        <div className={`dice-result ${rolling ? "rolling" : ""}`}>
          {rolling ? (
            <span className="rolling-icon">🎲</span>
          ) : result !== null ? (
            <strong>{result}</strong>
          ) : (
            <span className="dice-placeholder">
              {selectedDice.icon}
            </span>
          )}
        </div>

        <p className="dice-result-description">
          {rolling
            ? "Los dados están rodando..."
            : result !== null
              ? `¡Obtuviste un ${result} en el ${selectedDice.name}!`
              : "Presiona el botón para lanzar tu dado."}
        </p>

        <button
          className="generate-button dice-roll-button"
          onClick={rollDice}
          disabled={rolling}
        >
          {rolling ? "Lanzando..." : "Lanzar dado"}
        </button>
      </section>

      <section className="dice-history">
        <div className="dice-history-header">
          <div>
            <span className="eyebrow">TUS ÚLTIMOS RESULTADOS</span>
            <h2>Historial de lanzamientos</h2>
          </div>

          <button
            className="clear-history-button"
            onClick={clearHistory}
            disabled={history.length === 0}
          >
            Limpiar historial
          </button>
        </div>

        {history.length > 0 ? (
          <div className="history-list">
            {history.map((entry) => (
              <div className="history-item" key={entry.id}>
                <span className="history-dice">
                  {entry.dice}
                </span>

                <span className="history-description">
                  Resultado del lanzamiento
                </span>

                <strong className="history-result">
                  {entry.result}
                </strong>
              </div>
            ))}
          </div>
        ) : (
          <div className="placeholder-panel">
            <span className="placeholder-icon"></span>
            <h2>Aún no hay lanzamientos</h2>
            <p>
              Tus últimos resultados aparecerán aquí cuando
              comiences a lanzar los dados.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default DiceRoller;
