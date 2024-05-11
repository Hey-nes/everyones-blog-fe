import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://everyones-blog-be.vercel.app/api/posts",
        {
          postHeader: header,
          postContent: content,
        }
      );

      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h1>Create post</h1>
      <form onSubmit={handleCreatePost}>
        <label htmlFor="postHeader">Post Header:</label>
        <input
          type="text"
          id="postHeader"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          required
        />
        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          id="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
