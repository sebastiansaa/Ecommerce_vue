import { v4 as uuidv4 } from 'uuid';

// Mapa global para asociar ids numéricos a UUIDs
const idToUuidMap = new Map<number, string>();

/**
 * Obtiene el UUID asociado a un id numérico. Si no existe, lo genera y lo almacena.
 * @param idNum Id numérico recibido de la API
 * @returns UUID string asociado
 */
export function getUuidForId(idNum: number): string {
  if (!idToUuidMap.has(idNum)) {
    idToUuidMap.set(idNum, uuidv4());
  }
  return idToUuidMap.get(idNum)!;
}

/**
 * (Opcional) Limpia el mapa de ids a UUIDs (por ejemplo, al cerrar sesión)
 */
export function clearUuidMap() {
  idToUuidMap.clear();
}
