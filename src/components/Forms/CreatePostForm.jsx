import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Forms/Forms.css";

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
    <main className="form-main">
      <div className="form-wrapper">
        <div className="form-header">
          <header>
            <h1>Create post</h1>
          </header>
        </div>
        <div className="form">
          <form onSubmit={handleCreatePost} className="register-login">
            <label htmlFor="postHeader">Headline</label>
            <input
              type="text"
              id="postHeader"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              required
            />
            <label htmlFor="postContent">What's on your mind?</label>
            <input
              type="text"
              id="postContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button className="form-button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreatePost;
