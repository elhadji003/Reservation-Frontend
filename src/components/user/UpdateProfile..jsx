import React, { useState } from "react";
import {
  useGetMeQuery,
  useUpdateProfileUserMutation,
} from "../../features/auth/authAPI";
import toast from "react-hot-toast";

const UpdateProfile = ({ onclose }) => {
  const { data: user, refetch } = useGetMeQuery();

  console.log("user", user);
  

  const [editMode, setEditMode] = useState(false);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [updateUser, { isLoading }] = useUpdateProfileUserMutation();

  const handleModifyData = () => setEditMode(true);

  const handleCancelEdit = () => {
    setUsername(user?.username || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setFile(null);
    setPreview(null);
    setEditMode(false);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSaveData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      if (file) formData.append("avatar", file); // suppose que backend accepte "avatar"

      await updateUser(formData).unwrap();
      await refetch();
      setEditMode(false);
      onclose(onclose);
      toast.success("Profil mis à jour !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <form onSubmit={handleSaveData} className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Mes informations</h2>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div>
          <label className="block font-semibold mb-1">
            Prénom(s) et Nom(s) :
          </label>
          {editMode ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <p className="font-bold">{user?.username || "N/A"}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Email :</label>
          {editMode ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <p className="font-bold">{user?.email || "N/A"}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Téléphone :</label>
          {editMode ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <p className="font-bold">{user?.phone || "N/A"}</p>
          )}
        </div>

        {/* Upload image */}
        <div>
          <label className="block font-semibold mb-1">Photo de profil :</label>
          {editMode ? (
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full file:bg-amber-600 file:text-white file:px-4 file:py-2 file:rounded file:border-0 file:cursor-pointer text-gray-600"
              />
            </div>
          ) : (
            <p className="text-gray-400 text-sm">**Modifier ton avatar**</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6">
        {editMode ? (
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleModifyData}
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
          >
            Modifier mes données
          </button>
        )}
      </div>
    </form>
  );
};

export default UpdateProfile;
