
function DiceCard({ dice, selected, onClick }) {
  return (
    <button
      type="button"
      className={`dice-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="dice-card-icon">{dice.icon}</span>
      <strong>{dice.name}</strong>
      <small>{dice.faces} caras</small>
    </button>
  );
}

export default DiceCard;
