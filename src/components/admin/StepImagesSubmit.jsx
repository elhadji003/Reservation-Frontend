import { FaImage } from "react-icons/fa";

const StepImagesSubmit = ({ images, handleImageChange }) => {
  const imageInputs = ["image1", "image2", "image3"];

  return (
    <div className="grid grid-cols-1 gap-4">
      {imageInputs.map((key) => (
        <div key={key} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1 capitalize">
            {key}
          </label>

          <label
            htmlFor={key}
            className="flex flex-col items-center justify-center border-2 border-dashed border-amber-300 p-4 rounded cursor-pointer hover:border-amber-500 transition duration-200"
          >
            <FaImage className="text-amber-500 text-3xl mb-2" />
            <span className="text-sm text-gray-600">
              {images[key]?.name || "Cliquez pour sélectionner une image"}
            </span>
          </label>

          <input
            type="file"
            name={key}
            id={key}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      ))}
    </div>
  );
};

export default StepImagesSubmit;
