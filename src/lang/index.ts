import en from './en'
import es from './es'

export const languages = {
  en: 'EN',
  es: 'ES',
} as const

export type Lang = keyof typeof languages

export const defaultLang: Lang = 'en'

export const langStorageKey = 'lang'

export const ui = {
  en,
  es,
} as const

export type Messages = typeof en
export type MessageKey = keyof Messages
