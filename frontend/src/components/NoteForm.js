import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoteForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [existingTitles, setExistingTitles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchExistingNotes() {
      try {
        const response = await axios.get(
          "https://unwir-project-0joa.onrender.com/notes"
        );
        const titles = response.data.map((note) => note.title);
        setExistingTitles(titles);
      } catch (error) {
        console.error("Error fetching existing notes:", error);
      }
    }

    fetchExistingNotes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingTitles.includes(formData.title)) {
      setErrorMessage("Please ensure to add a unique title.");
      return;
    }

    try {
      await axios.post(
        "https://unwir-project-0joa.onrender.com/notes/add",
        formData
      );

      setFormData({
        title: "",
        content: "",
      });

      navigate("/cards");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleNavigate = () => {
    navigate("/cards");
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://cdn.pixabay.com/photo/2018/04/07/08/28/notepad-3297994_1280.jpg)`,
        backgroundSize: "auto",
        backgroundPosition: "-38% center",
        minHeight: "100vh",
      }}
    >
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <h1 className="text-2xl font-semibold text-center mb-5">
          Create a Note
        </h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="title"
            className="absolute text-lg text--500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-start-0 rtl:peer-translate-x-1/4 text-blue-600 dark:text-blue-500"
          >
            Title
          </label>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          ></textarea>
          <label
            htmlFor="content"
            className="absolute text-lg text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-start-0 rtl:peer-translate-x-1/4 text-blue-600 dark:text-blue-500"
          >
            Content
          </label>
        </div>
        <button
          type="submit"
          className="block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <div className="text-center">
        <button
          onClick={handleNavigate}
          class="bg-transparent hover:bg-purple-400  text-blue-700 font-semibold hover:text-white py-6 px-8 border border-purple-300 hover:border-transparent rounded"
        >
          My Notes
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
