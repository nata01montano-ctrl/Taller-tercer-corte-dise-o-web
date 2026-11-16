
function DiceTray() {
  const dice = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

  return (
    <main className="page-content">
      <section className="page-header">
        <span className="eyebrow">AZAR Y DESTINO</span>
        <h1>Bandeja de Dados</h1>
        <p>
          Lanza tus dados y deja que el destino decida.
        </p>
      </section>

      <div className="dice-grid">
        {dice.map((die) => (
          <div className="dice-card" key={die}>
            <span>Dados</span>
            <h2>{die.toUpperCase()}</h2>
            <p>1 dado de {die.substring(1)} caras</p>
            <span className="coming-label">PRÓXIMAMENTE</span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default DiceTray;
