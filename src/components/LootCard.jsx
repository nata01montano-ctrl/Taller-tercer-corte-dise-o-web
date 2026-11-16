
function LootCard({ item }) {

  const isMagic = item.rewardType === "magic";

  const rarity = item.rarity?.name;

  const description = item.desc?.[0];

  return (
    <article className={`loot-card ${isMagic ? "magic-card" : ""}`}>

      <div className="loot-card-icon">
        {isMagic ? "objeto magico" : "equipamiento"}
      </div>

      <div className="loot-card-content">

        <span className="loot-type">
          {isMagic ? "OBJETO MÁGICO" : "EQUIPAMIENTO"}
        </span>

        <h3>{item.name}</h3>

        {rarity && (
          <span className="loot-rarity">
            Rareza: {rarity}
          </span>
        )}

        {description && (
          <p>{description}</p>
        )}

        {item.equipment_category?.name && (
          <small>
            Categoría: {item.equipment_category.name}
          </small>
        )}

        {item.cost && (
          <small>
            Valor: {item.cost.quantity} {item.cost.unit}
          </small>
        )}

      </div>

    </article>
  );
}

export default LootCard;
