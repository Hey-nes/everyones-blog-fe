import { useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";

const Post = ({ post, isLoggedIn, isAdmin }) => {
  const [comment, setComment] = useState("");
  const [fetchedComments, setFetchedComments] = useState([]);

  const fetchPostComments = async () => {
    try {
      const response = await axios.get(
        `https://everyones-blog-be.vercel.app/api/comments?postId=${post._id}`
      );
      setFetchedComments(response.data);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [post._id]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://everyones-blog-be.vercel.app/api/comments",
        { text: comment, postId: post._id }
      );
      setComment("");
      fetchPostComments();
    } catch (error) {
      console.error("Error creating comment", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `https://everyones-blog-be.vercel.app/api/comments/${commentId}`
      );
      fetchPostComments();
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  return (
    <div className="post-wrapper">
      <div className="post">
        <h2>{post.postHeader}</h2>
        <div className="post-text">
          <p>{post.postContent}</p>
        </div>
        <div className="comment">
          <div className="comments">
            <h3>Comments:</h3>
            {fetchedComments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.text}</p>
                {isAdmin ? (
                  <button onClick={() => deleteComment(comment._id)}>
                    Delete
                  </button>
                ) : null}
              </div>
            ))}
            <div className="comment-box-wrapper">
              <h4>Join the discussion:</h4>
              {isLoggedIn ? (
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="comment-box"
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={handleCommentChange}
                    rows={4}
                  />
                  <button type="submit">Send comment</button>
                </form>
              ) : (
                <p>Please log in to comment.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
