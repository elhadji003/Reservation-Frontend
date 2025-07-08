import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "../../features/auth/authAPI";

const ForgotPwd = () => {
  const [forgotPassword] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data).unwrap(); // { email: ... }
      toast.success("Email de réinitialisation envoyé !");
    } catch (err) {
      toast.error("Erreur : " + err?.data?.email || "Échec de l'envoi.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Mot de passe oublié ?
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              placeholder="exemple@mail.com"
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
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-900 text-white py-3 rounded-lg hover:bg-amber-800 transition"
          >
            Envoyer le lien de réinitialisation
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPwd;
