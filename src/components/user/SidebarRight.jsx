// SidebarRight.jsx
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import UpdateProfile from "./UpdateProfile.";

export default function SidebarRight({ open, onClose, onOpen }) {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();

    alert("Mot de passe modifié (simulation)");
    setOldPassword("");
    setNewPassword("");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Es-tu sûr de vouloir supprimer ton compte ? Cette action est irréversible."
      )
    ) {
      alert("Compte supprimé (simulation)");
    }
  };

  // Ferme le drawer uniquement si clic sur le fond (box lui-même), pas sur les inputs
  const handleClickBackground = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const list = () => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      onClick={handleClickBackground}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className="p-6"
    >
      <List>
        <div>
          <h1 className="text-center text-2xl font-bold border-b border-gray-300 py-4 mb-6 bg-gray-100">
            Mon Profil
          </h1>

          <UpdateProfile onclose={onClose} />

          <form onSubmit={handlePasswordChange} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Modifier mot de passe
            </h2>

            <label className="block mb-2 font-medium">
              Mot de passe actuel
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            <label className="block mb-2 font-medium">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Modifier mot de passe
            </button>
          </form>

          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Supprimer mon compte
          </button>
        </div>
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      {list()}
    </SwipeableDrawer>
  );
}
