import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT to get user info
      setUserId(user.id); // Set userId from token
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/dashboard");
  };

  // Handle Delete
  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, config);
      setPosts(posts.filter((post) => post._id !== postId)); // Remove deleted post from state
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main content for displaying posts */}
      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={post.title}
                  className="w-full h-auto rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {post.title}
              </h2>
              <p className="mb-4 text-gray-700">{post.description}</p>
              {isLoggedIn && post.userId === userId && (
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/edit-post/${post._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right sidebar with Login/Register or Logout button */}
      <div className="w-1/4 bg-white shadow p-4 flex flex-col items-center">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="w-full bg-blue-500 text-white p-2 rounded mb-4 text-center hover:bg-blue-600 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full bg-green-500 text-white p-2 rounded mb-4 text-center hover:bg-green-600 transition duration-200"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-2 rounded mb-4 hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        )}
        {/* Conditionally render Create Post button */}
        {isLoggedIn && (
          <Link
            to="/create-post"
            className="w-full bg-gray-500 text-white p-2 rounded mb-4 text-center hover:bg-gray-600 transition duration-200"
          >
            Create Post
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
