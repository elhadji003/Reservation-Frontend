import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { useRegisterMutation } from "../../features/auth/authAPI";
import toast from "react-hot-toast";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const res = await register({
        username,
        email,
        password,
        password2,
      }).unwrap();
      toast.success("Inscription réussie !");
      navigate("/dashboardClient");
    } catch (error) {
      console.log("Une erreur s'est produite :", error);
      toast.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full lg:w-1/2 max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">Inscription</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Prénom(s) et Nom(s)
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom complet"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nom@exemple.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              id="confirm_password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 rounded-lg transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Inscription..." : "S'inscrire"}
          </button>

          <div className="text-sm mt-2 text-center">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="text-amber-900 hover:underline">
              Se connecter
            </Link>
          </div>
        </form>

        {/* Connexion sociale */}
        <div className="mt-8 space-y-3">
          <div className="flex gap-2 items-center justify-center text-gray-500 mb-4">
            <span className="w-20 h-px bg-gray-300" />
            <span>ou</span>
            <span className="w-20 h-px bg-gray-300" />
          </div>
          <div className="flex justify-center space-x-4">
            <button className="flex items-center justify-center gap-2 border px-4 py-2 rounded-lg">
              <FaGoogle size={25} />
            </button>
            <button className="flex items-center justify-center gap-2 border px-4 py-2 rounded-lg">
              <FaApple size={25} />
            </button>
            <button className="flex items-center justify-center gap-2 border px-4 py-2 rounded-lg">
              <FaFacebookF size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
