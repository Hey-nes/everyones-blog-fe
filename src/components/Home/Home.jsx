import { useState, useEffect } from "react";
import "./Home.css";
import Navigation from "../Navigation/Navigation";
import Hero from "../Hero/Hero";
import Post from "../Post/Post";
import Footer from "../Footer/Footer";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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

  // Function to check if the user is admin
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://everyones-blog-be.vercel.app/api/users/data", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsAdmin(data.isAdmin);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.error("Token not found in localStorage");
    }
  }, []);

  return (
    <div className="app">
      <Navigation
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <div className="wrapper">
        <header>
          <h1 className="hidden-mobile">Connect, post, comment!</h1>
        </header>
        <main className="main">
          <Hero />
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
            />
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
