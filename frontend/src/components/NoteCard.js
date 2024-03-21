import React from "react";

const NoteCard = ({ title, content, onUpdate, onDelete }) => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="max-w-sm mx-auto p-6 bg-violet-50 border border-black rounded-lg shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out transform hover:-translate-y-1">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-black">{content}</p>
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={onUpdate}
          >
            Update
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
