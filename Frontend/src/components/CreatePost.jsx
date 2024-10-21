import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. User may not be authenticated.");
      return; // Stop execution if there is no token
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("image", image);

    try {
      const response = await axios.post(
        "https://postapp-backend-n1p8.onrender.com/api/posts",
        formDataObj,
        config
      );
      console.log("Post created successfully:", response.data);
      // Redirect to the dashboard or another page after successful post creation
      navigate("/"); // Redirect to the dashboard or desired route
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-1/3"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl mb-6 text-center">Create Post</h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="block w-full p-2 mb-4 border rounded"
          required // Ensure title is required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="block w-full p-2 mb-4 border rounded"
          required // Ensure description is required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="block w-full p-2 mb-4"
          required // Ensure image is required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
