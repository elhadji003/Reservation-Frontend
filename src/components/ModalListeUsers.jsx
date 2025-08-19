import React from "react";
import { FaTrash } from "react-icons/fa";
import {
  useAdminDeleteAccountMutation,
  useListeUsersQuery,
} from "../features/auth/authAPI";
import Switch from "@mui/material/Switch";
import toast from "react-hot-toast";

export default function ModalListeUsers({ show, onClose }) {
  const { data: users = [] } = useListeUsersQuery();

  const label = { inputProps: { "aria-label": "Switch demo" } };

  if (!show) return null;

  const [deleteUser] = useAdminDeleteAccountMutation();

  const handleDeleteUser = (userId) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      deleteUser(userId)
        .unwrap()
        .then(() => {
          toast.success("Utilisateur supprimé avec succès");
          // Re-fetch users pour mettre à jour le tableau
        })
        .catch((error) => {
          console.error(error);
          toast.error("Une erreur est survenue lors de la suppression");
        });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-90">
      <div className="bg-white rounded-xl shadow-xl w-11/12 md:w-1/2 lg:w-3/5 p-6 relative">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Liste des Utilisateurs
        </h2>

        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">role</th>
                <th className="px-4 py-2">Bloqué</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.results?.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <Switch {...label} defaultChecked />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
