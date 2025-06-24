import React, { useState } from "react";
import LandingPage from "./components/Landingpage";
import ContactForm from "./components/Contactform";

export default function App() {
  const [page, setPage] = useState("landing"); // "landing" o "form"

  return (
    <>
      {page === "landing" && <LandingPage onNavigate={() => setPage("form")} />}
      {page === "form" && <ContactForm onBack={() => setPage("landing")} />}
    </>
  );
}