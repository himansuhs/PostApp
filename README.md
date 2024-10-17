

# Post Creation Application

A simple web application allowing users to create posts with images. Built using the **MERN stack** with **Tailwind CSS** for styling.

## Features

- Create posts with title, description, and image.
- View all posts in a feed.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Upload**: Multer

## Installation

### Backend Setup

1. Navigate to the `server` folder:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` folder with your MongoDB URI:
   ```plaintext
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `client` folder:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install

3. Start the frontend server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Create a Post

- **Method**: POST
- **URL**: `/api/posts/create`
- **Body**: `multipart/form-data` (title, description, image)

### Get All Posts

- **Method**: GET
- **URL**: `/api/posts`
