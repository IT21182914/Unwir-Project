import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./UpdateModal.css";

const NoteCard = ({ id, title, content, onUpdate, onDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/notes/update/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      });
      alert("Note updated successfully!");
      onUpdate(); // Trigger a reload of notes after update
      setModalIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating note:", error);
      alert("An error occurred while updating the note. Please try again.");
    }
  };

  return (
    <div>
      <div className="max-w-sm mx-auto p-6 bg-violet-50 border border-black rounded-lg shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out transform hover:-translate-y-1">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-black">{content}</p>
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={() => setModalIsOpen(true)}
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

      {/* Modal for Update */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal-container"
      >
        <div className="modal-content">
          <h2>Edit Note</h2>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="mb-2"
            placeholder="Title"
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="mb-2"
            placeholder="Content"
          />
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="mr-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Update
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 font-semibold rounded hover:bg-gray-300 transition duration-300 ease-in-out cancel" // Add 'cancel' class here
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NoteCard;
