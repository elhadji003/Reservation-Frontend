// src/components/Section2.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    id: 1,
    title: "Salle Réunion Premium",
    description: "Parfait pour vos réunions avec écran, Wi-Fi et clim.",
    imageUrl:
      "https://www.coworkbooking.com/images/1600%210/kapacita/20125/waypoint-9.jpg",
    rating: 4.7,
    tag: "Disponible",
    features: ["📶 Wi-Fi", "☕ Café", "❄️ Clim"],
  },
  {
    id: 2,
    title: "Bureau Privé",
    description: "Travailler en toute tranquillité avec accès sécurisé.",
    imageUrl:
      "https://www.coworkbooking.com/images/1600%210/kapacita/261/0226_mycelium_brunswick_050.jpg",
    rating: 4.3,
    tag: "Populaire",
    features: ["🔒 Sécurité", "📶 Wi-Fi", "🪑 Ergonomie"],
  },
  {
    id: 3,
    title: "Cabine de Consultation",
    description: "Idéal pour les appels ou consultations confidentielles.",
    imageUrl:
      "https://coworker.imgix.net/photos/senegal/dakar/dakar-coworking/main.jpeg?auto=format%2Ccompress&fit=crop&h=0&mark=%2Ftemplate%2Fimg%2Fwm_icon.png&markalign=center%2Cmiddle&markscale=5&q=90&w=800",
    rating: 4.5,
    tag: "Nouveau",
    features: ["🔇 Isolée", "📅 Sur réservation", "📶 Wi-Fi"],
  },
];

const Section2 = ({ isAuth }) => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Espaces à Découvrir
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-48 object-cover"
              />

              <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded">
                {card.tag}
              </span>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600">{card.description}</p>

                <div className="flex items-center gap-1 text-yellow-400 text-sm mt-2">
                  {renderStars(card.rating)}{" "}
                  <span className="text-gray-600">({card.rating})</span>
                </div>

                <div className="flex gap-2 flex-wrap mt-3 text-gray-500 text-xs">
                  {card.features.map((feature, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <button
                  onClick={isAuth}
                  className="mt-5 bg-amber-700 hover:bg-amber-800 text-white py-2 px-4 rounded text-sm w-full"
                >
                  Voir détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper pour les étoiles
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < full; i++) stars.push("★");
  if (half) stars.push("☆");
  while (stars.length < 5) stars.push("✩");

  return stars.map((s, i) => <span key={i}>{s}</span>);
};

export default Section2;
