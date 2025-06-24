import axios from "axios";
import { useState } from "react";

export default function ContactForm({ onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await axios.post("http://localhost:3025/api/v1/contact/createContact", formData);
      setSuccess("¡Mensaje enviado con éxito!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al enviar el formulario.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <button
        onClick={onBack}
        style={{
          marginBottom: 20,
          backgroundColor: "#5a3ea1",
          color: "white",
          border: "none",
          borderRadius: 6,
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        ← Regresar a Landing
      </button>

      <h2 style={{ textAlign: "center", marginBottom: 30, color: "#5a3ea1" }}>
        Formulario de Contacto
      </h2>

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 15, fontWeight: "600" }}>
          Nombre completo
          <input
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              borderRadius: 6,
              border: "1.8px solid #ccc",
              fontSize: 16,
            }}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Tu nombre completo"
          />
        </label>

        <label style={{ display: "block", marginBottom: 15, fontWeight: "600" }}>
          Correo
          <input
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              borderRadius: 6,
              border: "1.8px solid #ccc",
              fontSize: 16,
            }}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tucorreo@example.com"
          />
        </label>

        <label style={{ display: "block", marginBottom: 15, fontWeight: "600" }}>
          Teléfono
          <input
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              borderRadius: 6,
              border: "1.8px solid #ccc",
              fontSize: 16,
            }}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+52 123 456 7890"
          />
        </label>

        <label style={{ display: "block", marginBottom: 20, fontWeight: "600" }}>
          Mensaje
          <textarea
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              borderRadius: 6,
              border: "1.8px solid #ccc",
              fontSize: 16,
              resize: "vertical",
            }}
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
            placeholder="Escribe tu mensaje aquí..."
          />
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#5a3ea1",
            color: "white",
            fontWeight: "700",
            fontSize: 18,
            padding: "14px 0",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}