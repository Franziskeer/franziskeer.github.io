import type { LocalizedString } from "../lang";

export type AboutFocus = {
  id: string;
  icon: string;
  title: LocalizedString;
};

export const portrait = {
  src: "/about/portrait.png",
  imageAlt: {
    en: "Portrait of Fran Piñero",
    es: "Retrato de Fran Piñero",
  },
} as const satisfies {
  src: string;
  imageAlt: LocalizedString;
};

export const lead = [
  {
    en: "I like to have something between my hands. Personal projects keep me busy outside of work and help me stay active and motivated, even if they don't have an immediate utility or no one is going to see the result.",
    es: "Me gusta estar siempre con algo entre manos. Los proyectos personales me mantienen ocupado fuera del trabajo y me ayudan a mantenerme activo y motivado, aunque no tengan una utilidad inmediata o nadie vaya a ver el resultado.",
  },
  {
    en: "I end up doing a bit of everything. I like design and 3D printing, DIY and electronics. I start many projects but I barely finish any. I even learned to crochet.",
    es: "Por eso termino haciendo un poco de todo. Me gusta el diseño y la impresión 3D, el bricolaje y la electrónica y empiezo muchos proyectos aunque no termine ninguno. Incluso he aprendido a hacer crochet.",
  },
  {
    en: "But not everything has to be a project and be productive. In my free time I also play. Much more than my backlog of games considers reasonable. I like long stories, cooperative games, and that feeling that not only your character evolves and grows.",
    es: "Pero no todo tienen que ser proyectos y ser productivo, en mis ratos libres también juego. Mucho más de lo que mi lista de juegos pendientes considera razonable. Me gustan las historias que se alargan, las partidas con amigos y esa sensación de que no sólo es tu personaje el que evoluciona y crece.",
  },
  {
    en: "When I need to get away from all of that, I like to enjoy my town and nature. Going for a walk without a plan and coming back home quieter than when I left.",
    es: "Y cuando necesito salir de todo eso, me gusta disfrutar de mi pueblo y de la naturaleza. Salir a andar por senderos sin un plan y volver a casa más tranquilo que cuando me fuí.",
  },
] as const satisfies readonly LocalizedString[];

export const focus = [
  {
    id: "gaming",
    icon: "iconoir:gamepad",
    title: {
      en: "Games",
      es: "Videojuegos",
    },
  },
  {
    id: "maker",
    icon: "iconoir:electronics-chip",
    title: {
      en: "Tinkering",
      es: "Cacharreo",
    },
  },
  {
    id: "nature",
    icon: "iconoir:pine-tree",
    title: {
      en: "Outdoors",
      es: "Naturaleza",
    },
  },
] as const satisfies readonly AboutFocus[];
