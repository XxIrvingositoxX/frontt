import React, { useState } from "react";
import "./LandingPage.css";

const images = [
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=700&q=80",
];

export default function LandingPage({ onNavigate }) {
  const [index, setIndex] = useState(0);

  const nextImage = () => setIndex((i) => (i + 1) % images.length);
  const prevImage = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="landing">
      <header className="hero">
        <h1>PetCare</h1>
        <p>Expertos en cuidar lo que más amas</p>
        <button onClick={onNavigate}>Contáctanos</button>
      </header>

      <section className="services">
        <h2>Servicios Destacados</h2>
        <table>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Consulta General</td>
              <td>Chequeo integral de salud</td>
              <td>$500 MXN</td>
            </tr>
            <tr>
              <td>Vacunación</td>
              <td>Protección contra enfermedades comunes</td>
              <td>$300 MXN</td>
            </tr>
            <tr>
              <td>Desparasitación</td>
              <td>Interna y externa</td>
              <td>$350 MXN</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="carousel">
        <h2>Mascotas Felices</h2>
        <div className="carousel-container">
          <img src={images[index]} alt="Mascota" />
          <button className="prev" onClick={prevImage}>‹</button>
          <button className="next" onClick={nextImage}>›</button>
        </div>
      </section>
    </div>
  );
}