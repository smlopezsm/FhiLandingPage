/**
 * Configuration for the FHI (Fire History Interface) Official Project Documentation.
 * Provides bilingual direct links to the official PDF documents hosted on Google Drive.
 */
export const DOCUMENTATION_URLS = {
  en: 'https://drive.google.com/file/d/1eEvTVNce6dAoDNruAv2H0gyH0JkkeSVO/view?usp=sharing',
  es: 'https://drive.google.com/file/d/1alJxJ_NnEncDIjuRXG7Wu-5tf3Y-m7LE/view?usp=sharing',
} as const;

/**
 * Resolves the appropriate documentation URL based on the active i18n language.
 * Normalizes language codes (e.g. 'es-AR', 'es' -> 'es'; 'en-US', 'en' -> 'en').
 * Falls back to English for any unsupported language code.
 */
export function getDocumentationUrl(language?: string): string {
  if (language && language.toLowerCase().startsWith('es')) {
    return DOCUMENTATION_URLS.es;
  }
  return DOCUMENTATION_URLS.en;
}

/**
 * Backward compatibility export.
 */
export const DOCUMENTATION_PDF_URL = DOCUMENTATION_URLS.en;
