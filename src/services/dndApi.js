
const BASE_URL = "https://www.dnd5eapi.co/api/2014";

// Función general para realizar peticiones
async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(
      `Error al consultar la API: ${response.status}`
    );
  }

  return await response.json();
}

// BESTIARIO
export async function getMonsters() {
  const data = await fetchData("/monsters");
  return data.results;
}

export async function getMonsterByIndex(index) {
  return await fetchData(`/monsters/${index}`);
}

// LOOT
// Obtener listado de equipamiento
export async function getEquipment() {
  const data = await fetchData("/equipment");
  return data.results;
}

// Obtener detalles de un objeto
export async function getEquipmentByIndex(index) {
  return await fetchData(`/equipment/${index}`);
}

// Obtener listado de objetos mágicos
export async function getMagicItems() {
  const data = await fetchData("/magic-items");
  return data.results;
}

// Obtener detalles de un objeto mágico
export async function getMagicItemByIndex(index) {
  return await fetchData(`/magic-items/${index}`);
}
