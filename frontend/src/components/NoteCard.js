import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./UpdateModal.css";

const NoteCard = ({ id, title, content, onUpdate, onDelete }) => {
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/notes/update/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      });
      onUpdate(id, updatedTitle, updatedContent);
      setUpdateModalIsOpen(false);
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, 1500);
    } catch (error) {
      console.error("Error updating note:", error);
      setErrorAlert(true);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/notes/${id}`);
      onDelete(id);
      setDeleteModalIsOpen(false);
      setDeleteSuccessAlert(true);

      setTimeout(() => {
        setDeleteSuccessAlert(false);
      }, 1000);
    } catch (error) {
      console.error("Error deleting note:", error);
      setErrorAlert(true);
    }
  };

  return (
    <div>
      <div className="text-center">
        {successAlert && (
          <div
            className="mx-auto p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-600"
            role="alert"
          >
            <span className="font-medium">Success alert!</span> Successfully
            updated the note.
          </div>
        )}
      </div>

      <div className="text-center">
        {errorAlert && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-600"
            role="alert"
          >
            <span class="font-medium">Danger alert!</span> Change a few things
            up and try submitting again.
          </div>
        )}
      </div>

      <div className="text-center">
        {deleteSuccessAlert && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-600"
            role="alert"
          >
            <span class="font-medium">Danger alert!</span> You have successfully
            deleted the note.
          </div>
        )}
      </div>

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
            onClick={() => setUpdateModalIsOpen(true)}
          >
            Update
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={() => setDeleteModalIsOpen(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {/* Modal for Update */}
      <Modal
        isOpen={updateModalIsOpen}
        onRequestClose={() => setUpdateModalIsOpen(false)}
        className="modal-container"
      >
        <div className="modal-content">
          <h1
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Edit Note
          </h1>

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
              onClick={() => setUpdateModalIsOpen(false)}
              className="px-4 py-2 font-semibold rounded hover:bg-gray-300 transition duration-300 ease-in-out cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Modal for Delete Confirmation */}
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        className="modal-container"
      >
        <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
            viewBox="0 0 320.591 320.591"
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000"
            ></path>
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000"
            ></path>
          </svg>
          <div className="my-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 fill-red-500 inline"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                data-original="#000000"
              />
              <path
                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                data-original="#000000"
              />
            </svg>
            <h4 className="text-xl font-semibold mt-6">
              Are you sure you want to delete it?
            </h4>
            <p className="text-sm text-gray-500 mt-4">
              This action cannot be undone. This will permanently delete the
              note.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              className="px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="px-6 py-2.5 rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              onClick={() => setDeleteModalIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <br />
      <br />
    </div>
  );
};

export default NoteCard;
