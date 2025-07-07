const StepDateLocation = ({ form, handleChange, ressources }) => (
  <div className="grid grid-cols-1 gap-4">
    {/* Date de début */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        Date de début
      </label>
      <input
        type="datetime-local"
        name="start_time"
        value={form.start_time}
        onChange={handleChange}
        className="border border-amber-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    {/* Date de fin */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        Date de fin
      </label>
      <input
        type="datetime-local"
        name="end_time"
        value={form.end_time}
        onChange={handleChange}
        className="border border-amber-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    {/* Lien de la carte */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        Lien carte
      </label>
      <input
        name="map"
        value={form.map}
        onChange={handleChange}
        placeholder="https://maps.google.com/..."
        className="border border-amber-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    {/* Sélection de ressource */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        Ressource associée
      </label>
      <select
        name="resource"
        value={form.resource}
        onChange={handleChange}
        className="border border-amber-300 px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <option value="">-- Choisir une ressource --</option>
        {ressources?.results?.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default StepDateLocation;
