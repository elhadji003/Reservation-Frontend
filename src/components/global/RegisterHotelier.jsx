import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRegisterHotelierMutation } from "../../features/auth/authAPI";
import { set } from "react-hook-form";

export default function RegisterHotelier() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    numero_linea: "",
    hotel_name: "",
    address: "",
    description: "",
    avatar: null,
  });

  const [registerHotelier, { isLoading }] = useRegisterHotelierMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    // Préparer les données en FormData pour l'upload d'avatar
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await registerHotelier(data).unwrap();
      toast.success("Inscription hôtelier réussie !");
      setFormData({
        email: "",
        password: "",
        password2: "",
        numero_linea: "",
        hotel_name: "",
        address: "",
        description: "",
        avatar: null,
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'inscription !");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Inscription Hôtelier
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
         <input
          type="text"
          name="hotel_name"
          placeholder="Nom de l'hôtel"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          value={formData.hotel_name}
          onChange={handleChange}
          required
        />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        <div className="flex items-center gap-3">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirmer le mot de passe"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="numero_linea"
          placeholder="Numéro de ligne"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          value={formData.numero_linea}
          onChange={handleChange}
        />
       
        <input
          type="text"
          name="address"
          placeholder="Adresse"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-dashed rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-900 hover:bg-amber-800 text-white py-2 rounded-lg transition"
        >
          {isLoading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
