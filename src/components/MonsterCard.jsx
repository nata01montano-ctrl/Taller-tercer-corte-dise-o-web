
function MonsterCard({ monster, onClick }) {
  const armorClass =
    monster.armor_class?.[0]?.value ?? "N/D";

  const hitPoints = monster.hit_points ?? "N/D";

  const challengeRating =
    monster.challenge_rating ?? "N/D";

  return (
    <article className="monster-card">

      <div className="monster-card-header">
        <span className="monster-icon">Monstruo</span>

        <span className="monster-type">
          {monster.type || "Criatura"}
        </span>
      </div>

      <h3>{monster.name}</h3>

      <p className="monster-description">
        {monster.size || "Tamaño desconocido"} ·{" "}
        {monster.alignment || "Alineamiento desconocido"}
      </p>

      <div className="monster-stats">

        <div className="stat">
          <span>Armadura</span>
          <small>Clase de Armadura</small>
          <strong>{armorClass}</strong>
        </div>

        <div className="stat">
          <span>Vidas</span>
          <small>Puntos de Golpe</small>
          <strong>{hitPoints}</strong>
        </div>

        <div className="stat">
          <span>Desafío</span>
          <small>Desafío</small>
          <strong>{challengeRating}</strong>
        </div>

      </div>

      <button
        className="monster-button"
        onClick={() => onClick(monster)}
      >
        Ver información →
      </button>

    </article>
  );
}

export default MonsterCard;
