/**
 * Prueba 1 — teclado numérico (DOM, sin canvas).
 *
 * Empieza con 7 y 2 ya en su sitio (sin glitch). El resto glitchea
 * y se revela a destiempo. Clic + clic intercambia nodos.
 * En cuanto un número cae en su posición se queda quieto.
 * Al completar el numpad, el padre pasa a la fase 2: pinpad.
 * Cuatro teclas llevan huella; el PIN es una permutación de esas cuatro.
 */

/** El PIN es el orden; cada dígito lleva tantos puntos UV como su posición. */
export const PIN = "4836";

const PRINT_POSE = [
  { x: "26%", y: "16%", rot: "-24deg", size: "78%" },
  { x: "-22%", y: "6%", rot: "32deg", size: "84%" },
  { x: "4%", y: "30%", rot: "-38deg", size: "76%" },
  { x: "22%", y: "-18%", rot: "16deg", size: "80%" },
] as const;

const SOURCE = [
  { symbol: ">", digit: "1" },
  { symbol: "!", digit: "2" },
  { symbol: "@", digit: "3" },
  { symbol: "#", digit: "4" },
  { symbol: "$", digit: "5" },
  { symbol: "%", digit: "6" },
  { symbol: "&", digit: "7" },
  { symbol: "=", digit: "8" },
  { symbol: "ç", digit: "9" },
] as const;

const NUMPAD = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

type Tile = (typeof SOURCE)[number] & { id: number };

function isSolved(buttons: HTMLButtonElement[]) {
  return buttons.every((button, index) => button.dataset.digit === NUMPAD[index]);
}

const HINTS = ["7", "2"] as const;

function fisherYates<T>(items: T[]) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/** 7 y 2 fijas; el resto desordenado y sin extra en su sitio. */
function shuffle(): Tile[] {
  const tiles = ordered();
  const kept = new Set(HINTS.map((digit) => NUMPAD.indexOf(digit)));
  const pool = tiles.filter((_, index) => !kept.has(index));
  const slots = tiles.map((_, index) => index).filter((index) => !kept.has(index));

  fisherYates(pool);
  for (let i = 0; i < pool.length - 1; i++) {
    if (pool[i].digit === NUMPAD[slots[i]]) {
      [pool[i], pool[i + 1]] = [pool[i + 1], pool[i]];
    }
  }
  const last = pool.length - 1;
  if (last > 0 && pool[last].digit === NUMPAD[slots[last]]) {
    [pool[last], pool[last - 1]] = [pool[last - 1], pool[last]];
  }

  pool.forEach((tile, index) => {
    tiles[slots[index]] = tile;
  });
  return tiles;
}

function ordered(): Tile[] {
  return NUMPAD.map((digit, id) => {
    const tile = SOURCE.find((item) => item.digit === digit);
    if (!tile) throw new Error(`Missing keypad tile ${digit}`);
    return { ...tile, id };
  });
}

function setFace(button: HTMLButtonElement, value: string) {
  button.querySelectorAll("[data-face]").forEach((node) => {
    node.textContent = value;
  });
}

function createCell(tile: Tile, glitch: boolean) {
  const button = document.createElement("button");
  button.type = "button";
  button.role = "gridcell";
  button.className = "keypad-cell";
  button.dataset.symbol = tile.symbol;
  button.dataset.digit = tile.digit;
  if (glitch) {
    button.style.setProperty("--cell-frame", `${4.2 + Math.random() * 2.4}s`);
    button.style.setProperty("--cell-red", `${3.1 + Math.random() * 1.6}s`);
    button.style.setProperty("--cell-cyan", `${3.6 + Math.random() * 1.8}s`);
    button.style.setProperty("--cell-delay", `${(-Math.random() * 6).toFixed(2)}s`);
  }

  button.innerHTML = `
    <span class="keypad-cell__label">
      <span class="keypad-cell__layer" data-face></span>
      <span class="keypad-cell__layer keypad-cell__layer--red" data-face aria-hidden="true"></span>
      <span class="keypad-cell__layer keypad-cell__layer--cyan" data-face aria-hidden="true"></span>
    </span>
  `;
  setFace(button, glitch ? tile.symbol : tile.digit);
  const pinIndex = PIN.indexOf(tile.digit);
  if (pinIndex !== -1) {
    button.dataset.print = "";
    const uv = document.createElement("span");
    uv.className = "keypad-cell__uv";
    uv.setAttribute("aria-hidden", "true");

    const print = document.createElement("span");
    print.className = "keypad-cell__print";
    const pose = PRINT_POSE[pinIndex] ?? PRINT_POSE[0];
    print.style.setProperty("--print-x", pose.x);
    print.style.setProperty("--print-y", pose.y);
    print.style.setProperty("--print-rot", pose.rot);
    print.style.setProperty("--print-size", pose.size);
    const img = document.createElement("img");
    img.src = "/secret/fingerprint.svg";
    img.alt = "";
    img.draggable = false;
    print.append(img);
    uv.append(print);

    const marks = document.createElement("span");
    marks.className = "keypad-cell__marks";
    for (let i = 0; i < pinIndex + 1; i++) {
      const mark = document.createElement("span");
      mark.className = "keypad-cell__mark";
      marks.append(mark);
    }
    uv.append(marks);
    button.append(uv);
  }
  return button;
}

type Options = {
  settled?: boolean;
  pinSlots?: HTMLElement;
};

export function mountKeypad(root: HTMLElement, onSolved: () => void, options: Options = {}) {
  let selected: HTMLButtonElement | null = null;
  let done = options.settled ?? false;
  let cancelled = false;
  const timers: number[] = [];
  const pinTimers: number[] = [];
  let stopPin: (() => void) | undefined;

  const later = (ms: number, fn: () => void) => {
    const id = window.setTimeout(() => {
      if (!cancelled && !done) fn();
    }, ms);
    timers.push(id);
  };

  const cells = () => [...root.querySelectorAll<HTMLButtonElement>(":scope > button")];

  const lock = (button: HTMLButtonElement) => {
    button.dataset.placed = "";
    button.disabled = true;
    button.removeAttribute("data-reveal");
    button.removeAttribute("data-selected");
    if (selected === button) selected = null;
    setFace(button, button.dataset.digit ?? "");
  };

  const settle = () => {
    done = true;
    cancelled = true;
    for (const id of timers) window.clearTimeout(id);
    selected?.removeAttribute("data-selected");
    selected = null;
    root.dataset.solved = "";
    for (const button of cells()) lock(button);
  };

  const lockCorrect = () => {
    for (const [index, button] of cells().entries()) {
      if (button.dataset.digit === NUMPAD[index]) lock(button);
    }
  };

  const onClick = (button: HTMLButtonElement) => {
    if (done || button.hasAttribute("data-placed")) return;
    if (selected === null) {
      selected = button;
      button.dataset.selected = "";
      return;
    }
    if (selected === button) {
      selected.removeAttribute("data-selected");
      selected = null;
      return;
    }

    const a = selected;
    const b = button;
    a.removeAttribute("data-selected");
    selected = null;

    const marker = document.createElement("span");
    root.insertBefore(marker, a);
    root.insertBefore(a, b);
    root.insertBefore(b, marker);
    marker.remove();

    lockCorrect();
    if (isSolved(cells())) {
      settle();
      const id = window.setTimeout(() => {
        onSolved();
        armPin();
      }, 400);
      pinTimers.push(id);
    }
  };

  const pinLater = (ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    pinTimers.push(id);
  };

  const armPin = () => {
    const slots = options.pinSlots;
    if (!slots) return;

    stopPin?.();
    let entry = "";
    let locked = false;
    let busy = false;

    const paintSlots = () => {
      [...slots.children].forEach((slot, index) => {
        if (!(slot instanceof HTMLElement)) return;
        slot.toggleAttribute("data-filled", index < entry.length);
      });
    };

    const flashKey = (digit: string) => {
      const button = cells().find((cell) => cell.dataset.digit === digit);
      if (!button) return;
      button.dataset.press = "";
      pinLater(140, () => button.removeAttribute("data-press"));
    };

    const clearVerdict = () => {
      delete root.dataset.no;
      delete root.dataset.ok;
      delete slots.dataset.no;
      delete slots.dataset.ok;
    };

    const press = (digit: string) => {
      if (locked || busy || entry.length >= 4) return;
      entry += digit;
      paintSlots();
      flashKey(digit);
      if (entry.length < 4) return;

      busy = true;
      if (entry === PIN) {
        locked = true;
        root.dataset.ok = "";
        slots.dataset.ok = "";
        return;
      }

      root.dataset.no = "";
      slots.dataset.no = "";
      pinLater(620, () => {
        entry = "";
        paintSlots();
        clearVerdict();
        busy = false;
      });
    };

    const onPinClick = (event: Event) => {
      const button = event.currentTarget;
      if (!(button instanceof HTMLButtonElement)) return;
      const digit = button.dataset.digit;
      if (digit) press(digit);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
      if (!/^[1-9]$/.test(event.key)) return;
      event.preventDefault();
      press(event.key);
    };

    root.dataset.pin = "";
    for (const button of cells()) {
      button.disabled = false;
      button.addEventListener("click", onPinClick);
    }
    window.addEventListener("keydown", onKey);
    paintSlots();

    stopPin = () => {
      window.removeEventListener("keydown", onKey);
      for (const button of cells()) {
        button.removeEventListener("click", onPinClick);
      }
      for (const id of pinTimers) window.clearTimeout(id);
      pinTimers.length = 0;
      entry = "";
      paintSlots();
      clearVerdict();
      delete root.dataset.pin;
    };
  };

  const tiles = done ? ordered() : shuffle();
  const buttons = tiles.map((tile, index) => {
    const placed = done || tile.digit === NUMPAD[index];
    const button = createCell(tile, !placed);
    if (placed) {
      lock(button);
    } else {
      const looping = () => !done && !button.hasAttribute("data-placed");
      const loop = () => {
        later(2200 + Math.random() * 4800, () => {
          if (!looping()) return;
          button.dataset.reveal = "";
          setFace(button, button.dataset.digit ?? "");
          later(380 + Math.random() * 420, () => {
            if (!looping()) return;
            button.removeAttribute("data-reveal");
            setFace(button, button.dataset.symbol ?? "");
            loop();
          });
        });
      };
      later(Math.random() * 2800, loop);
      button.addEventListener("click", () => onClick(button));
    }
    return button;
  });

  root.replaceChildren(...buttons);
  if (done) {
    root.dataset.solved = "";
    armPin();
  }

  return () => {
    cancelled = true;
    done = true;
    stopPin?.();
    for (const id of timers) window.clearTimeout(id);
    for (const id of pinTimers) window.clearTimeout(id);
    root.replaceChildren();
    delete root.dataset.solved;
    delete root.dataset.pin;
  };
}
