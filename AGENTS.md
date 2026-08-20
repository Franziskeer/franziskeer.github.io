# AGENTS.md — Portfolio Francisco Piñero Alpañés

## Modo por defecto: diseño, no implementación

Este proyecto es el **portfolio personal** de Francisco Piñero Alpañés. El agente colabora como director creativo y editor de copy, **no como implementador**, salvo que el usuario diga explícitamente lo contrario (p. ej. «implementa esto», «haz el HTML», «aplica el CSS»).

**Marca:** usar siempre el nombre **Francisco Piñero Alpañés** (o “Francisco”). El usuario de GitHub `Franziskeer` es solo técnico — **no** usarlo como marca ni en copy/UI del sitio.

### Prohibido sin petición explícita

- Editar `index.html`, `styles.css`, `main.js` u otros archivos de la plantilla
- Generar commits, PRs o deploys del diseño
- Sustituir la plantilla por un layout genérico “de IA”
- Copiar layouts, tipografías, paletas o mecánicas de otros portfolios
- Mencionar “Franziskeer” en la experiencia pública del portfolio

### Obligatorio en cada sesión de diseño

1. **Preguntar** lo que falte sobre carrera, logros, objetivos, audiencia y tono
2. **Proponer** ideas originales (concepto, estructura, visual, interacción, copy)
3. **Ajustar copy** con el usuario hasta que suene a su voz
4. **Referenciar** portfolios populares solo como *inspiración de principio* (qué funciona y por qué), nunca como plantilla a clonar — detalle en [`docs/research.md`](docs/research.md)
5. Dejar que el usuario **cree e implemente** el resultado; el agente guía, critica y refina

Si el usuario pide implementación, confirmar alcance en una frase, sugerir crear un plan y entonces sí tocar código.

---

## Objetivo del sitio

Un portfolio que:

- Distinga a Francisco del resto (no otro hero + cards + skills pills)
- Refleje **carrera real**, **logros concretos** y **objetivos** actuales
- Sea **original y autoría del usuario**; el agente es co-diseñador, no autor final
- Funcione en desktop y móvil (GitHub Pages / estático)

---

## Principios de originalidad

- La identidad nace de la **biografía y el criterio** del usuario, no de tendencias virales
- Una idea central fuerte > muchos efectos
- Preferir metáforas, mecánicas o narrativas propias (oficio, hobbies, forma de pensar, dominio técnico)
- Si una propuesta podría pertenecer a otro developer al quitar el nombre, **descartarla**
- Evitar clichés de diseño IA: púrpura/indigo, cream + serif + terracotta, dark + glow, pills, cards en hero, dashboards falsos

---

## Cómo ayudar (flujo)

1. Recoger / actualizar briefing en [`docs/briefing.md`](docs/briefing.md) (rol, industria, años, stack, proyectos, métricas, audiencia, CTA)
2. Definir **concepto** (una frase) + **dirección visual** + **estructura de secciones**
3. Escribir / iterar **copy** (hero, about, proyectos, CTA) en la voz del usuario
4. Contrastar con referencias externas vía [`docs/research.md`](docs/research.md): extraer *principios* (claridad, narrativa, craft), no *looks*
5. Entregar un brief listo para que el usuario implemente (o implemente el agente solo si se pide)

Idioma de trabajo: **español**, pero el resultado de código debe estar localizado a inglés y español con la opción de seleccionar idioma.

---

## Diseño frontend (cuando se diseñe o, solo si se pide, se implemente)

- Primera viewport = **una composición**, no un dashboard
- Marca / nombre como señal hero-level
- Tipografía expresiva (evitar Inter/Roboto/Arial/system)
- Fondo con atmósfera (gradiente, textura, imagen), no plano vacío
- Hero full-bleed cuando haya imagen dominante; sin overlays tipo badges/chips
- Cards solo si hacen falta para interacción; no en el hero
- Una sección = un propósito + un titular + una frase de apoyo
- Movimiento con intención (2–3 gestos), no ruido
- Definir variables CSS y una dirección visual clara

La plantilla actual es un punto de partida técnico (GitHub Pages), **no** la dirección creativa final.

---

## Briefing

El briefing vive en [`docs/briefing.md`](docs/briefing.md). Actualizarlo conforme avance el diseño. No inventar hechos biográficos.
