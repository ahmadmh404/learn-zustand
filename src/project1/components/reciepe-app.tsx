import { useState } from "react";
import { Reciepe, useReciepe } from "../store/use-store";

export const ReciepeApp = () => {
  const { reciepes, addReciepe, removeReciepe, editReciepe } = useReciepe();

  const [reciepeData, setReciepeData] = useState({
    id: new Date().getTime(),
    name: "",
    ingrediants: "",
    instructions: "",
  });

  const [editingReciepe, setEditingReciepe] = useState<Reciepe | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setReciepeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReciepe = () => {
    if (
      !reciepeData.name ||
      !reciepeData.ingrediants ||
      !reciepeData.ingrediants
    )
      return;

    addReciepe({
      id: Date.now(),
      name: reciepeData.name,
      ingrediants: reciepeData.ingrediants.split(",").map((ing) => ing.trim()),
      instructions: reciepeData.instructions,
    });

    setReciepeData({
      id: new Date().getTime(),
      name: "",
      instructions: "",
      ingrediants: "",
    });
  };

  const handleCancel = () => {
    setEditingReciepe(null);
    setReciepeData({
      id: new Date().getTime(),
      name: "",
      ingrediants: "",
      instructions: "",
    });
  };

  const handleEditReciepe = (reciepe: Reciepe) => {
    setEditingReciepe(reciepe);
    setReciepeData({
      id: reciepe.id,
      name: reciepe.name.trim(),
      ingrediants: reciepe.ingrediants.join(", "),
      instructions: reciepe.instructions.trim(),
    });
  };

  const handleEdit = () => {
    if (
      !reciepeData.name ||
      !reciepeData.ingrediants ||
      !reciepeData.ingrediants
    )
      return;

    editReciepe({
      id: reciepeData.id,
      name: reciepeData.name,
      ingrediants: reciepeData.ingrediants.split(",").map((ing) => ing.trim()),
      instructions: reciepeData.instructions,
    });

    setReciepeData({
      id: new Date().getTime(),
      name: "",
      ingrediants: "",
      instructions: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-6 space-y-5 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-7 text-green-800 text-center">
          Reciepes Book
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Reciepe name"
            value={reciepeData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="ingrediants"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Reciepe ingrediants"
            value={reciepeData.ingrediants}
            onChange={handleChange}
          />

          <textarea
            name="instructions"
            className="w-full resize-none px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Reciepe instructions"
            value={reciepeData.instructions}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between">
          {editingReciepe ? (
            <>
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
              >
                Edit Reciepe
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAddReciepe}
                className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                {editingReciepe ? "Edit" : "Add"} reciepe
              </button>
            </>
          )}
        </div>

        {reciepes.length > 0 && (
          <ul className="space-y-4">
            {reciepes.map((reciepe) => (
              <li
                key={reciepe.id}
                className="p-4 bg-green-50 rounded-lg shadow-sm"
              >
                <h2 className="text-xl text-green-800 font-semibold">
                  {reciepe.name}
                </h2>

                <p className="text-gray-800 mb-2">
                  {reciepe.ingrediants.join(", ")}
                </p>

                <p className="text-gray-600 text-sm mb-2">
                  {reciepe.instructions}
                </p>

                <div className="flex justify-between">
                  <button
                    className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                    onClick={() => handleEditReciepe(reciepe)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => removeReciepe(reciepe.id)}
                    className="bg-rose-500 text-white px-3 py-2 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
