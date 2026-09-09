/**
 * Progreso de /secret.
 *
 *   1 → 2
 *
 * Al resolver la 1 el teclado se queda ordenado (sin glitch) y el HUD pasa a 02.
 * Atajo: `?stage=2`. Reset: `?stage=1`.
 */
export const RIDDLE_STAGES = ["1", "2"] as const;

export type RiddleStage = (typeof RIDDLE_STAGES)[number];

const STORAGE_KEY = "secret-riddle-stage";

function isStage(value: string | null): value is RiddleStage {
  return RIDDLE_STAGES.includes(value as RiddleStage);
}

export function readRiddleStage(): RiddleStage {
  const query = new URLSearchParams(window.location.search).get("stage");
  if (isStage(query)) {
    writeRiddleStage(query);
    return query;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isStage(stored) ? stored : "1";
}

export function writeRiddleStage(stage: RiddleStage) {
  window.localStorage.setItem(STORAGE_KEY, stage);
}

export function nextRiddleStage(stage: RiddleStage): RiddleStage | null {
  if (stage === "1") return "2";
  return null;
}
