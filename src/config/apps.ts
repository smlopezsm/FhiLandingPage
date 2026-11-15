/**
 * Centralized configuration for the two FHI ecosystem applications.
 * 
 * In this challenge phase, the apps are marked as `isAvailable: false` (Coming Soon)
 * and trigger an informative modal instead of broken links or dead navigations.
 * Once deployed, simply set `isAvailable: true` and configure their production URLs.
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
    nameEn: 'Explore FHI',
    nameEs: 'Explorar FHI',
    taglineEn: 'FHI (Fire History Interface) · Earth Observation & Satellite Harmonization',
    taglineEs: 'FHI (Fire History Interface) · Observación Terrestre y Armonización Satelital',
    descriptionEn:
      'Interactive scientific platform providing 24 years (2000–present) of unified MODIS and VIIRS active fire observations across Argentina, 3D orbital visualization, regional anomaly diagnostics, and open data export.',
    descriptionEs:
      'Plataforma científica interactiva con 24 años (2000–hoy) de observaciones unificadas de focos activos MODIS y VIIRS en Argentina, visualización orbital 3D, diagnóstico de anomalías y exportación de datos abiertos.',
    badgeEn: 'Coming Soon for Review',
    badgeEs: 'Próximamente para Evaluación',
    url: 'http://localhost:5173', // Internal dev default, guarded by isAvailable
    isAvailable: false,
    version: 'v1.0-rc1',
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
    badgeEn: 'Ecosystem Preview · In Development',
    badgeEs: 'Avance del Ecosistema · En Desarrollo',
    url: 'https://prediction.firehistory.org', // Dedicated future endpoint
    isAvailable: false,
    version: 'v0.5-beta',
    categoryEn: 'Predictive Intelligence & Risk',
    categoryEs: 'Inteligencia Predictiva y Riesgo',
    accentColor: '#FF9C55',
    techEn: ['Predictive Risk Layers', 'Environmental Telemetry', 'Territory Exposure Modeling'],
    techEs: ['Capas de Riesgo Predictivo', 'Telemetría Ambiental', 'Modelado de Exposición Territorial'],
  },
};
