import { EXTERNAL_LINKS } from './externalLinks';

/**
 * Centralized configuration for the two FHI ecosystem applications.
 */

export interface AppConfig {
  id: 'observation' | 'prediction';
  nameEn: string;
  nameEs: string;
  taglineEn: string;
  taglineEs: string;
  descriptionEn: string;
  descriptionEs: string;
  badgeEn: string;
  badgeEs: string;
  url: string;
  isAvailable: boolean;
  version: string;
  categoryEn: string;
  categoryEs: string;
  accentColor: string;
  techEn: string[];
  techEs: string[];
}

export const APPS_CONFIG: Record<'observation' | 'prediction', AppConfig> = {
  observation: {
    id: 'observation',
    nameEn: 'Explore Fire History Interface',
    nameEs: 'Explorar Fire History Interface',
    taglineEn: 'FHI (Fire History Interface) · Earth Observation & Satellite Harmonization',
    taglineEs: 'FHI (Fire History Interface) · Observación Terrestre y Armonización Satelital',
    descriptionEn:
      'Interactive scientific platform providing 24 years (2000–present) of unified MODIS and VIIRS active fire observations across Argentina, 3D orbital visualization, regional anomaly diagnostics, and open data export.',
    descriptionEs:
      'Plataforma científica interactiva con 24 años (2000–hoy) de observaciones unificadas de focos activos MODIS y VIIRS en Argentina, visualización orbital 3D, diagnóstico de anomalías y exportación de datos abiertos.',
    badgeEn: 'Live Application',
    badgeEs: 'Aplicación en Vivo',
    url: EXTERNAL_LINKS.fhi,
    isAvailable: true,
    version: 'v1.0',
    categoryEn: 'Scientific Analysis & Exploration',
    categoryEs: 'Análisis y Exploración Científica',
    accentColor: '#B8EE68',
    techEn: ['Mapbox 3D Globe', 'NASA Orbit Geometry', 'DuckDB Columnar API', 'MODIS × VIIRS Harmonization'],
    techEs: ['Globo 3D Mapbox', 'Geometría Orbital NASA', 'API Columnar DuckDB', 'Armonización MODIS × VIIRS'],
  },
  prediction: {
    id: 'prediction',
    nameEn: 'Fire Prediction App',
    nameEs: 'App de Predicción de Incendios',
    taglineEn: 'Predictive Modeling & Territory Risk Assessment',
    taglineEs: 'Modelado Predictivo y Evaluación de Riesgo Territorial',
    descriptionEn:
      'Forward-looking companion application focused on fire vulnerability modeling, danger index forecasting, and territorial risk analysis to support prevention and emergency planning.',
    descriptionEs:
      'Aplicación complementaria orientada al modelado de vulnerabilidad ante incendios, pronóstico de índices de peligro y análisis de riesgo territorial para apoyar la prevención y respuesta temprana.',
    badgeEn: 'Live Application',
    badgeEs: 'Aplicación en Vivo',
    url: EXTERNAL_LINKS.predict,
    isAvailable: true,
    version: 'v1.0',
    categoryEn: 'Predictive Intelligence & Risk',
    categoryEs: 'Inteligencia Predictiva y Riesgo',
    accentColor: '#FF9C55',
    techEn: ['Predictive Risk Layers', 'Environmental Telemetry', 'Territory Exposure Modeling'],
    techEs: ['Capas de Riesgo Predictivo', 'Telemetría Ambiental', 'Modelado de Exposición Territorial'],
  },
};
