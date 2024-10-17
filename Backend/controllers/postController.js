const Post = require("../models/Post");
const multer = require("multer");
const path = require("path");

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Create Post
exports.createPost = [
  upload.single("image"),
  async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const post = new Post({
        user: req.userId,
        title,
        description,
        image,
      });

      await post.save();
      res.status(201).json(post); // Return 201 Created
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  },
];

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name");
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Update Post
exports.updatePost = [
  upload.single("image"), // Handle image uploads
  async (req, res) => {
    const { title, description } = req.body;

    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      // Check if the user is authorized
      if (post.user.toString() !== req.userId) {
        return res.status(401).json({ msg: "Unauthorized" });
      }

      // Update fields
      post.title = title || post.title; // Keep the old title if not provided
      post.description = description || post.description; // Keep the old description if not provided

      // If a new image is uploaded, update the image field
      if (req.file) {
        post.image = req.file.filename; // Use the uploaded image filename
      }

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  },
];

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the user is authorized
    if (post.user.toString() !== req.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await post.deleteOne();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
