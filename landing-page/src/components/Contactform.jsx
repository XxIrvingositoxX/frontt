import axios from "axios";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm({ onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false,
    recaptchaToken: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onRecaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!captchaToken) {
      setError("Por favor, verifica que no eres un robot.");
      return;
    }

    if (!formData.termsAccepted) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3025/api/v1/contact/createContact", {
        ...formData,
        recaptchaToken: captchaToken,
      });
      setSuccess("¡Mensaje enviado con éxito!");
      setFormData({ name: "", email: "", phone: "", message: "", termsAccepted: false });
      setCaptchaToken(null);
      recaptchaRef.current.reset();
    } catch (err) {
      console.error("Error en handleSubmit:", err.response?.data); // Mostrar detalles del error
      setError(err.response?.data?.error || "Ocurrió un error al enviar el formulario.");
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

        <label style={{ display: "block", marginBottom: 20, fontWeight: "600" }}>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
            style={{ marginRight: 8 }}
          />
          Acepto los <a href="/terms" style={{ color: "#5a3ea1", textDecoration: "underline" }}>términos y condiciones</a>
        </label>

        <div style={{ marginBottom: 20 }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LczaWsrAAAAAL99J-Pw0qoPigdMSXkyGkXAwRhc"
            onChange={onRecaptchaChange}
          />
        </div>

        {success && (
          <p style={{ color: "green", marginBottom: 15, textAlign: "center" }}>
            {success}
          </p>
        )}
        {error && (
          <p style={{ color: "red", marginBottom: 15, textAlign: "center" }}>
            {error}
          </p>
        )}

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
            opacity: !captchaToken || !formData.termsAccepted ? 0.6 : 1,
          }}
          disabled={!captchaToken || !formData.termsAccepted}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}