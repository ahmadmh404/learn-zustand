import { useState } from "react";
import { Expence, useStore } from "../store/use-store";
import { BsPencilFill, BsTrash2Fill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { TbPinnedFilled } from "react-icons/tb";
import { RiUnpinFill } from "react-icons/ri";

export const ExpenceTracker = () => {
  const {
    expences,
    addExpence,
    removeExpence,
    editExpence,
    searchExpences,
    pinExpence,
  } = useStore();

  const [search, setSearch] = useState({
    searchText: "",
    isSearching: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const [newExpence, setNewExpence] = useState({
    id: new Date().getMinutes(),
    desc: "",
    amount: 0,
    isPinned: false,
  });

  const handleCler = () => {
    setNewExpence({
      id: new Date().getTime(),
      desc: "",
      amount: 0,
      isPinned: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewExpence((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitExpence = () => {
    if (!newExpence.desc || !newExpence.amount) return;

    if (isEditing) {
      editExpence(newExpence);
      setIsEditing(false);
    } else {
      addExpence(newExpence);
    }

    handleCler();
  };

  const handleDelete = (id: number) => {
    removeExpence(id);
  };

  const handleEdit = (expence: Expence) => {
    setIsEditing(true);

    setNewExpence({
      id: expence.id,
      desc: expence.desc,
      amount: expence.amount,
      isPinned: expence.isPinned,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);

    handleCler();
  };

  const handleSearch = () => {
    searchExpences(search.searchText);
  };

  const handlePin = (id: number) => {
    pinExpence(id);
  };

  const totalExpences = expences.reduce((a, b) => a + +b.amount, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 to-blue-500">
      <div className="bg-white p-9 rounded-lg shadow-md w-full max-w-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-purple-800">
            Expence Tracker
          </h1>

          <button
            onClick={() => {
              setSearch((prev) => ({
                ...prev,
                isSearching: !prev.isSearching,
              }));
            }}
          >
            <BiSearch className="size-5" />
          </button>
        </div>

        <div className="space-y-4">
          {search.isSearching ? (
            <div className="flex items-center gap-x-4">
              <input
                type="text"
                name="search"
                value={search.searchText}
                placeholder="Search hrer.."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                onChange={(e) =>
                  setSearch((prev) => ({ ...prev, searchText: e.target.value }))
                }
              />

              <button
                onClick={handleSearch}
                className={`bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer`}
              >
                Search
              </button>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={newExpence.desc}
                onChange={handleChange}
                placeholder="Expence description"
                name="desc"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
              />

              <input
                type="number"
                value={newExpence.amount}
                onChange={handleChange}
                placeholder="Expence amount"
                name="amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
              />

              <div className="flex justify-between">
                <button
                  className={`w-full bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer`}
                  onClick={handleSubmitExpence}
                >
                  {isEditing ? "Edit" : "Add"} expence
                </button>

                {isEditing && (
                  <button
                    className={`bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer`}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {expences.length > 0 && (
          <ul className="space-y-4">
            {expences.map((expence) => (
              <li
                key={expence.id}
                className="group flex items-center justify-between bg-purple-100 p-4 rounded-lg shadow-sm transition-transform hover:scale-110"
              >
                <div className="flex gap-x-2 items-center">
                  {expence.isPinned && (
                    <span className="text-blue-500">
                      <TbPinnedFilled className="size-4" />
                    </span>
                  )}

                  <span className="font-semibold text-gray-800">
                    {expence.desc} :
                    <span className="text-purple-600">{expence.amount}$</span>
                  </span>
                </div>

                <div className="flex items-center gap-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                    onClick={() => handleEdit(expence)}
                  >
                    <BsPencilFill className="size-4" />
                  </button>

                  <button
                    className="bg-rose-500 text-white px-3 py-2 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                    onClick={() => handleDelete(expence.id)}
                  >
                    <BsTrash2Fill className="size-4" />
                  </button>

                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    onClick={() => handlePin(expence.id)}
                  >
                    {!expence.isPinned ? (
                      <TbPinnedFilled className="size-4" />
                    ) : (
                      <RiUnpinFill className="size-4" />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="text-center text-2xl font-semibold text-purple-600">
          Total Expences : {totalExpences ?? 0}$
        </p>
      </div>
    </div>
  );
};
