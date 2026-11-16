
import {
  getEquipment,
  getEquipmentByIndex,
  getMagicItems,
  getMagicItemByIndex
} from "./dndApi";

// Lanzar dados virtuales
function rollDice(number, faces) {
  let total = 0;

  for (let i = 0; i < number; i++) {
    total += Math.floor(Math.random() * faces) + 1;
  }

  return total;
}

// Determinar categoría del tesoro según CR
export function getLootTier(cr) {
  if (cr <= 1) return "Bajo";
  if (cr <= 4) return "Medio";
  if (cr <= 10) return "Alto";

  return "Legendario";
}

// Generar monedas
export function generateCoins(cr) {
  let copper = 0;
  let silver = 0;
  let gold = 0;
  let platinum = 0;

  if (cr <= 1) {
    copper = rollDice(2, 10);
    silver = rollDice(1, 8);
  } else if (cr <= 4) {
    copper = rollDice(2, 10);
    silver = rollDice(2, 10);
    gold = rollDice(2, 6);
  } else if (cr <= 10) {
    silver = rollDice(2, 10);
    gold = rollDice(4, 10);
    platinum = rollDice(1, 4);
  } else {
    gold = rollDice(6, 10);
    platinum = rollDice(4, 10);
  }

  return {
    copper,
    silver,
    gold,
    platinum
  };
}

// Seleccionar un objeto aleatorio
function randomItem(items) {
  if (!items || items.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * items.length);

  return items[index];
}

// Cantidad de objetos según CR
function getItemCount(cr) {
  if (cr <= 1) return 1;
  if (cr <= 4) return rollDice(1, 2);
  if (cr <= 10) return rollDice(1, 3) + 1;

  return rollDice(1, 4) + 2;
}

// Probabilidad de encontrar objetos mágicos
function canFindMagicItem(cr) {
  let probability;

  if (cr <= 1) probability = 0.05;
  else if (cr <= 4) probability = 0.20;
  else if (cr <= 10) probability = 0.50;
  else probability = 0.80;

  return Math.random() < probability;
}

// Generar todo el botín
export async function generateLoot(cr) {
  const [equipment, magicItems] = await Promise.all([
    getEquipment(),
    getMagicItems()
  ]);

  if (!equipment.length) {
    throw new Error("No hay equipamiento disponible.");
  }

  const coins = generateCoins(cr);
  const itemCount = getItemCount(cr);

  const rewards = [];

  // Seleccionar equipamiento
  for (let i = 0; i < itemCount; i++) {
    const selected = randomItem(equipment);

    if (selected) {
      const details = await getEquipmentByIndex(selected.index);

      rewards.push({
        ...details,
        rewardType: "equipment"
      });
    }
  }

  // Posibilidad de obtener objeto mágico
  if (
    magicItems.length > 0 &&
    canFindMagicItem(cr)
  ) {
    const selectedMagic = randomItem(magicItems);

    const magicDetails = await getMagicItemByIndex(
      selectedMagic.index
    );

    rewards.push({
      ...magicDetails,
      rewardType: "magic"
    });
  }

  return {
    tier: getLootTier(cr),
    challengeRating: cr,
    coins,
    items: rewards
  };
}
