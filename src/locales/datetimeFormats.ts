export default {
  en: {
    dateFormat: (mo: string, da: string): string => `${da}/${mo}`,
    dateTimeFormat: (mo: string, da: string, hr: string, mi: string): string => `${da}/${mo} ${hr}:${mi}`
  },
  zh: {
    dateFormat: (mo: string, da: string): string => `${mo}${da}`,
    dateTimeFormat: (mo: string, da: string, hr: string, mi: string): string => `${mo}${da} ${hr}:${mi}`
  }
}
