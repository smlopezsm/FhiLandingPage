/**
 * Configuration for the FHI (Fire History Interface) Official Project Documentation PDF.
 *
 * To enable official documentation download / view:
 * 1. Place the PDF file inside `LandingPage/public/docs/` (e.g. `/docs/FHI-Documentation.pdf`)
 *    OR provide an external HTTPS link.
 * 2. Set `DOCUMENTATION_PDF_URL` to that path / URL string.
 *
 * While `DOCUMENTATION_PDF_URL` is `null` or empty, the floating documentation button
 * displays a discreet "Coming Soon" / "Próximamente" state and avoids broken links.
 */
export const DOCUMENTATION_PDF_URL: string | null = null;
