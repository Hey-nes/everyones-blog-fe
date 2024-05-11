import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ isLoggedIn, setIsLoggedIn, setIsAdmin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <div className="navigation">
      <header>
        <h1 className="logotype">Everyones Blog</h1>
      </header>
      <ul className="menu">
        {isLoggedIn ? (
          <>
            <li>
              <span>You are logged in!</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <Link to={"/create-post"}>
                <button>Create new post</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button>Log in</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
