const StepGeneralInfo = ({ form, handleChange }) => (
  <div className="grid grid-cols-1 gap-4">
    {/* Titre */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Titre</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Ex : Salle de réunion"
        className="border border-amber-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    {/* Catégorie */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        Catégorie
      </label>
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Ex : Conférence, Atelier..."
        className="border border-amber-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    {/* Note */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Note</label>
      <input
        name="rating"
        type="number"
        value={form.rating}
        onChange={handleChange}
        placeholder="⭐⭐⭐⭐⭐"
        className="border border-amber-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        min={0}
        max={5}
      />
    </div>

    {/* Checkbox Réservation */}
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name="is_booked"
        checked={form.is_booked}
        onChange={handleChange}
        className="h-4 w-4 text-amber-600 border-gray-300 rounded"
      />
      <label className="text-sm text-gray-700">Est déjà réservé ?</label>
    </div>
  </div>
);

export default StepGeneralInfo;
