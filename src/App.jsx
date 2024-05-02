import React, { useState } from "react";
import Footer from "./components/Footer";
import Headermain from "./components/Headermain";
import MainForm from "./components/MainForm";

function App() {
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <>
      <Headermain onMainpage={!submitted} />

      <MainForm onSubmit={handleSubmit} />

      <Footer />
    </>
  );
}

export default App;
