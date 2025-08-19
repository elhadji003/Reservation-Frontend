import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../features/auth/authAPI";
import { setCredentials } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notAvailable = () => {
    toast.error("Cette fonctionnalité n'est pas encore disponible");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();

      dispatch(setCredentials(res)); // adapte selon ton backend
      toast.success("Connexion réussie!");

      const role = res.user?.role;

      if (role === "admin") {
        navigate("/dashboardAdmin");
      }  else if (role === "hotelier") {
        navigate("/dashboardHotelier");
      } else {
        navigate("/dashboardClient");
      }
    } catch (err) {
      console.error("Erreur de connexion : ", err);
      toast.error("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800">Connexion</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
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
                placeholder="nom@exemple.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                {...register("email", {
                  required: "Email requis",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email invalide",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                {...register("password", {
                  required: "Mot de passe requis",
                  minLength: {
                    value: 6,
                    message: "Au moins 6 caractères",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-amber-900 text-white py-3 rounded-lg transition duration-300 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-amber-800"
              }`}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>

            {/* Links */}
            <div className="flex justify-between text-sm mt-2">
              <Link to="/register" className="text-amber-900 hover:underline">
                Créer un compte
              </Link>
              <Link to="/forgot-pwd" className="text-amber-900 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
          </form>

          {/* Social login */}
          <div className="mt-8 space-y-3">
            <div className="flex gap-2 items-center justify-center text-gray-500 mb-4">
              <span className="w-20 h-px bg-gray-300" />
              <span>ou</span>
              <span className="w-20 h-px bg-gray-300" />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={notAvailable}
                className="flex items-center justify-center gap-2 border px-4 py-2 rounded-lg"
              >
                <FaGoogle size={25} />
              </button>
              <button
                onClick={notAvailable}
                className="flex items-center justify-center gap-2 border px-4 py-2 rounded-lg"
              >
                <FaApple size={25} />
              </button>
              <button
                onClick={notAvailable}
                className="flex items-center justify-center gap-2 border px-4 py-2 rounded-lg"
              >
                <FaFacebookF size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
