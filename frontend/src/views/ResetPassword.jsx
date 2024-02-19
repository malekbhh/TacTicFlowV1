import React, { useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loading indicator

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true); // Show loading indicator

      const response = await axiosClient.post("/password-reset", { email });

      if (response.status === 200) {
        setSuccessMessage(
          "Un lien de réinitialisation du mot de passe a été envoyé à votre adresse email."
        );
      } else if (response.status === 404) {
        setErrorMessage(
          "L'adresse email saisie n'est pas enregistrée. Veuillez créer un compte à la place."
        );
      } else if (response.status === 422) {
        // Handle specific validation errors
        setErrorMessage(
          response.data.message || "Veuillez entrer une adresse email valide."
        );
      } else {
        setErrorMessage(
          "Une erreur est survenue. Veuillez réessayer ultérieurement."
        );
      }
    } catch (err) {
      setErrorMessage(
        "Une erreur est survenue. Veuillez réessayer ultérieurement."
      );
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="z-10 flex min-h-screen overflow-hidden justify-center items-center gap-52">
        <div className="px-8 pt-4 pb-8 h-full bg-white w-90 rounded-2xl flex flex-col gap-1 items-center justify-center">
          <img className="h-16" src="/logo2.png" alt="logo" />
          <p className="mb-4 text-midnightblue font-medium flex items-center justify-center text-xl">
            Réinitialiser votre mot de passe
          </p>

          <form
            className="flex flex-col items-center gap-2"
            onSubmit={handleSubmit}
          >
            <span className="text-gray-600 text-xs mb-4 block w-full max-w-xs">
              <span className="text-blue-500 font-bold">
                Mot de passe oublié ?
              </span>
              Pas de problème. Indiquez simplement votre adresse email et nous
              vous enverrons un lien de réinitialisation de mot de passe qui
              vous permettra d'en choisir un nouveau.
            </span>

            {errorMessage && (
              <p className="text-red-500 text-xs mb-4">{errorMessage}</p>
            )}

            <input
              className="w-80 border border-gray-300 text-gray-500 rounded-xl px-5 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Entrez votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <button
              type="submit"
              className="h-8 w-24 bg-[#212177] mb-1 text-white items-center px-4 pb-1 justify-center font-medium mt-4 rounded-xl"
              disabled={isLoading} // Disable button during request
            >
              {isLoading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
