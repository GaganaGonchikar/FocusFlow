import React from "react";
import "./StartingPage.css";

const StartingPage = () => {
  const handleAdminClick = () => {
    // Redirect to admin login page
    window.location.href = "/admin-login";
  };

  const handleUserClick = () => {
    // Redirect to user login page
    window.location.href = "/user-login";
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/08/Bosch-Logo.png"
          alt="Bosch Logo"
          className="login-page__logo"
        />
        <button
          className="login-page__button login-page__button--admin"
          onClick={handleAdminClick}
        >
          ADMIN
        </button>
        <button
          className="login-page__button login-page__button--user"
          onClick={handleUserClick}
        >
          USER
        </button>
      </div>
    </div>
  );
};

export default StartingPage;
