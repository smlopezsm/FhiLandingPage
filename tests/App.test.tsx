import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import i18n from "../src/i18n";

describe("LandingPage App Component", () => {
  beforeEach(() => {
    i18n.changeLanguage("en");
  });

  it("renders all sections and main branding in English by default", () => {
    render(<App />);

    // Brand and subtitle
    expect(screen.getAllByText(/FHI/i)[0]).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /Harmonizing 26 Years of Satellite Fire Observations/i,
      )[0],
    ).toBeInTheDocument();

    // Section 2: Challenge
    expect(
      screen.getAllByText(/NASA Space Apps Challenge/i)[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Harmonization of MODIS and VIIRS Hot Spots/i)[0],
    ).toBeInTheDocument();

    // Section 3: Solution
    expect(
      screen.getAllByText(/Our Solution: FHI \(Fire History Interface\)/i)[0],
    ).toBeInTheDocument();

    // Section 4: Fire Prediction App
    expect(
      screen.getAllByText(/Companion Fire Prediction App/i)[0],
    ).toBeInTheDocument();

    // Section 5: Team
    expect(
      screen.getByText(/The Team Behind the Project/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We are a team of six people from Argentina/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Santiago López")).toBeInTheDocument();
    expect(screen.getByText("Computer Engineering Student")).toBeInTheDocument();
    expect(screen.getByText("Juan Alberto Rivero")).toBeInTheDocument();
    expect(screen.getByText("Jonathan Alexis Rivero")).toBeInTheDocument();
    expect(screen.getByText("Valentín Martínez")).toBeInTheDocument();
    expect(screen.getByText("Gastón Sosa")).toBeInTheDocument();
    expect(screen.getByText("Pablo Denis")).toBeInTheDocument();

    // Links to official applications
    const fhiLinks = screen.getAllByRole("link", { name: /Explore Fire History Interface/i });
    expect(fhiLinks.length).toBeGreaterThanOrEqual(2);
    fhiLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "https://fhi.intercomputacion.com.ar/");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    const predLinks = screen.getAllByRole("link", { name: /Fire Prediction App/i });
    expect(predLinks.length).toBeGreaterThanOrEqual(2);
    predLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "https://fhipredict.intercomputacion.com.ar/");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    const predSectionLink = screen.getByRole("link", { name: /Explore Prediction App/i });
    expect(predSectionLink).toHaveAttribute("href", "https://fhipredict.intercomputacion.com.ar/");
    expect(predSectionLink).toHaveAttribute("target", "_blank");
    expect(predSectionLink).toHaveAttribute("rel", "noopener noreferrer");

    const docLink = screen.getByRole("link", { name: /Documentation/i });
    expect(docLink).toBeInTheDocument();
    expect(docLink).toHaveAttribute("href", "https://drive.google.com/file/d/1eEvTVNce6dAoDNruAv2H0gyH0JkkeSVO/view?usp=sharing");
    expect(docLink).toHaveAttribute("target", "_blank");
    expect(docLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("toggles language between English and Spanish seamlessly", () => {
    render(<App />);

    // Find language switcher
    const langBtn = screen.getByRole("button", { name: /Switch to Spanish/i });
    expect(langBtn).toBeInTheDocument();

    fireEvent.click(langBtn);

    // Should now display Spanish content
    expect(
      screen.getAllByText(
        /Armonizando 26 Años de Observaciones Satelitales de Fuego/i,
      )[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/NASA Space Apps Challenge/i)[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /Nuestra Solución: FHI \(Fire History Interface\)/i,
      )[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/App Complementaria de Predicción/i)[0],
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Somos un equipo de seis personas de Argentina/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Estudiante de Ingeniería Informática")).toBeInTheDocument();
    expect(screen.getByText("Profesor de Informática")).toBeInTheDocument();
    expect(screen.getByText("Bombero y Desarrollador")).toBeInTheDocument();
    expect(screen.getByText("Deportista de Alto Rendimiento")).toBeInTheDocument();
    expect(screen.getByText("Desarrollador y Liderazgo")).toBeInTheDocument();
    expect(screen.getByText("Estudiante de Tecnicatura en Desarrollo de Software")).toBeInTheDocument();

    // Verify Spanish documentation link
    const docLinkEs = screen.getByRole("link", { name: /Documentación/i });
    expect(docLinkEs).toBeInTheDocument();
    expect(docLinkEs).toHaveAttribute("href", "https://drive.google.com/file/d/1alJxJ_NnEncDIjuRXG7Wu-5tf3Y-m7LE/view?usp=sharing");
    expect(docLinkEs).toHaveAttribute("target", "_blank");
    expect(docLinkEs).toHaveAttribute("rel", "noopener noreferrer");

    // Verify Spanish application links
    const fhiLinksEs = screen.getAllByRole("link", { name: /Explorar Fire History Interface/i });
    expect(fhiLinksEs.length).toBeGreaterThanOrEqual(2);
    fhiLinksEs.forEach((link) => {
      expect(link).toHaveAttribute("href", "https://fhi.intercomputacion.com.ar/");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    const predLinksEs = screen.getAllByRole("link", { name: /App de Predicción/i });
    expect(predLinksEs.length).toBeGreaterThanOrEqual(2);
    predLinksEs.forEach((link) => {
      expect(link).toHaveAttribute("href", "https://fhipredict.intercomputacion.com.ar/");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    const predSectionLinkEs = screen.getByRole("link", { name: /Explorar App de Predicción/i });
    expect(predSectionLinkEs).toHaveAttribute("href", "https://fhipredict.intercomputacion.com.ar/");
    expect(predSectionLinkEs).toHaveAttribute("target", "_blank");
    expect(predSectionLinkEs).toHaveAttribute("rel", "noopener noreferrer");
  });
});
