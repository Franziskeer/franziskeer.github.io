const supportedLangs = ["es", "en"];
const storageKey = "lang";

const catalogs = {};

function lookup(dict, key) {
  if (!dict || !key) {
    return undefined;
  }

  return key.split(".").reduce((acc, part) => acc?.[part], dict);
}

function getInitialLang() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("lang");
  if (supportedLangs.includes(fromQuery)) {
    return fromQuery;
  }

  try {
    const stored = localStorage.getItem(storageKey);
    if (supportedLangs.includes(stored)) {
      return stored;
    }
  } catch {
    /* ignore */
  }

  return "es";
}

function applyLang(lang) {
  const dict = catalogs[lang];
  if (!dict) {
    return;
  }

  document.documentElement.lang = lang;
  document.title = lookup(dict, "meta.title") ?? document.title;

  const description = document.querySelector('meta[name="description"]');
  const metaDescription = lookup(dict, "meta.description");
  if (description && metaDescription) {
    description.setAttribute("content", metaDescription);
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = lookup(dict, key);
    if (value != null) {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    const isActive = button.getAttribute("data-set-lang") === lang;
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem(storageKey, lang);
  } catch {
    /* ignore */
  }

  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);
}

async function loadCatalogs() {
  const entries = await Promise.all(
    supportedLangs.map(async (lang) => {
      const response = await fetch(`lang/${lang}.json`);
      if (!response.ok) {
        throw new Error(`No se pudo cargar lang/${lang}.json`);
      }
      return [lang, await response.json()];
    }),
  );

  entries.forEach(([lang, dict]) => {
    catalogs[lang] = dict;
  });
}

async function initLang() {
  await loadCatalogs();
  applyLang(getInitialLang());

  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLang(button.getAttribute("data-set-lang"));
    });
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

initLang();
