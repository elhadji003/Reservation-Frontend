import React from "react";
import { FaCalendarAlt, FaClock, FaStickyNote } from "react-icons/fa";

const StepConfirmation = ({ data }) => {
  return (
    <div className="space-y-6 text-gray-700">
      <h2 className="text-lg font-bold text-emerald-600 mb-4">
        Résumé du slot
      </h2>

      <div className="flex items-center gap-3">
        <FaStickyNote className="text-emerald-600" />
        <span className="font-semibold">Titre :</span>
        <span>{data.title || "Non défini"}</span>
      </div>

      <div className="flex items-center gap-3">
        <FaStickyNote className="text-emerald-600" />
        <span className="font-semibold">Description :</span>
        <span>{data.description || "Non défini"}</span>
      </div>

      <div className="flex items-center gap-3">
        <FaCalendarAlt className="text-emerald-600" />
        <span className="font-semibold">Date :</span>
        <span>{data.date || "Non défini"}</span>
      </div>

      <div className="flex items-center gap-3">
        <FaClock className="text-emerald-600" />
        <span className="font-semibold">Heure :</span>
        <span>
          {data.startTime || "--:--"} - {data.endTime || "--:--"}
        </span>
      </div>
    </div>
  );
};

export default StepConfirmation;
