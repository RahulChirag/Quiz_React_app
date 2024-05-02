// App.jsx
import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./components/LandingPage.jsx";
import LoginForm from "./components/LoginForm.jsx";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  return (
    <>
      <Header onLoginClick={handleLoginClick} />
      {showLoginForm ? <LoginForm /> : <LandingPage />}
      <Footer />
    </>
  );
}

export default App;
