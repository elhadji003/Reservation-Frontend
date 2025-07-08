import { useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../features/auth/authAPI";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ResetPwd = () => {
  const { uid, token } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await resetPassword({
        uid, // récupéré via useParams
        token, // récupéré via useParams
        new_password: data.password,
        re_new_password: data.confirmPassword,
      }).unwrap();
      toast.success("Mot de passe réinitialisé !");
    } catch (err) {
      toast.error("Échec de la réinitialisation.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Réinitialiser le mot de passe
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nouveau mot de passe */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Mot de passe requis",
                minLength: {
                  value: 6,
                  message: "Au moins 6 caractères",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirmer mot de passe */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              {...register("confirmPassword", {
                required: "Confirmez le mot de passe",
                validate: (value) =>
                  value ===
                    (document.getElementById("password")?.value || "") ||
                  "Les mots de passe ne correspondent pas",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-amber-900 text-white py-3 rounded-lg transition duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-800"
            }`}
          >
            {isLoading ? "Réinitialisation..." : "Réinitialiser"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPwd;
