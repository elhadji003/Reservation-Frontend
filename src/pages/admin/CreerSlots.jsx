import React, { useState } from "react";
import {
  useCreateSlotMutation,
  useGetResourcesQuery,
  useGetFacilitiesQuery,
} from "../../features/slot/slotAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreerSlots = () => {
  const [form, setForm] = useState({
    title: "",
    is_booked: false,
    category: "",
    rating: 0,
    start_time: "",
    end_time: "",
    map: "",
    resource: "",
    facilities: [],
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const [previews, setPreviews] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  const [createSlot, { isLoading }] = useCreateSlotMutation();
  const { data: ressources } = useGetResourcesQuery();
  const { data: facilities } = useGetFacilitiesQuery();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFacilityChange = (id) => {
    setForm((prev) => {
      const alreadySelected = prev.facilities.includes(id);
      return {
        ...prev,
        facilities: alreadySelected
          ? prev.facilities.filter((fid) => fid !== id)
          : [...prev.facilities, id],
      };
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      // Vérification de l'extension
      const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      const ext = file.name.split(".").pop().toLowerCase();

      if (!validExtensions.includes(ext)) {
        toast.error("Format de fichier non supporté.");
        return;
      }

      setImages((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "facilities") {
        value.forEach((id) => formData.append("facilities", id));
      } else {
        formData.append(key, value);
      }
    });

    Object.entries(images).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      await createSlot(formData).unwrap();
      toast.success("Créneau créé avec succès !");
      setForm({
        title: "",
        is_booked: false,
        category: "",
        rating: 0,
        start_time: "",
        end_time: "",
        map: "",
        resource: "",
        facilities: [],
      });
      setImages({ image1: null, image2: null, image3: null });
      setPreviews({ image1: "", image2: "", image3: "" });
      navigate("/mes-slots");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la création du créneau.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-700">
        ➕ Nouveau créneau
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg border border-amber-200"
        encType="multipart/form-data"
      >
        {/* Titre */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />

        {/* Catégorie */}
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Catégorie"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />

        {/* Note */}
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Note (ex : 4)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />

        {/* Début */}
        <input
          type="datetime-local"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />

        {/* Fin */}
        <input
          type="datetime-local"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />

        {/* Lien map */}
        <input
          type="text"
          name="map"
          value={form.map}
          onChange={handleChange}
          placeholder="Lien Google Maps"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />

        {/* Ressource liée */}
        <select
          name="resource"
          value={form.resource}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        >
          <option value="">-- Sélectionner une ressource --</option>
          {ressources?.results?.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        {/* Réservé ? */}
        <label className="flex items-center gap-2 col-span-1 md:col-span-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="is_booked"
            checked={form.is_booked}
            onChange={handleChange}
            className="accent-amber-600"
          />
          Est-ce déjà réservé ?
        </label>

        {/* Facilities */}
        <div className="md:col-span-2">
          <h3 className="font-semibold text-gray-700 mb-2">
            Équipements disponibles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {facilities?.results?.map((facility) => (
              <label
                key={facility.id}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={form.facilities.includes(facility.id)}
                  onChange={() => handleFacilityChange(facility.id)}
                  className="accent-amber-700"
                />
                {facility.name}
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        {["image1", "image2", "image3"].map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 capitalize mb-1">
              {key}
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              name={key}
              onChange={handleImageChange}
              className="border border-gray-300 rounded px-3 py-1"
            />

            {previews[key] && (
              <img
                src={previews[key]}
                alt={`preview-${key}`}
                className="mt-2 w-32 h-20 object-cover rounded shadow"
              />
            )}
          </div>
        ))}

        {/* Bouton */}
        <button
          type="submit"
          disabled={isLoading}
          className="md:col-span-2 mt-4 bg-amber-700 hover:bg-amber-800 transition text-white font-bold py-2 px-6 rounded shadow-md"
        >
          {isLoading ? "Création en cours..." : "Créer le créneau"}
        </button>
      </form>
    </div>
  );
};

export default CreerSlots;
