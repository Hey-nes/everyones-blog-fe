import { useState, useEffect } from "react";
import "./Home.css";
import Navigation from "../Navigation/Navigation";
import Hero from "../Hero/Hero";
import Post from "../Post/Post";
import Footer from "../Footer/Footer";

const Home = ({ isLoggedIn, userEmail }) => {
  const [posts, setPosts] = useState([]);

  // Function to fetch posts
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          "https://everyones-blog-be.vercel.app/api/posts"
        );
        const fetchedPosts = await response.json();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="app">
      <Navigation />
      <div className="wrapper">
        <header>
          <h1 className="hidden-mobile">Connect, post, comment!</h1>
        </header>
        <main className="main">
          <Hero />
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
