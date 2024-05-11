import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn, userEmail }) => {
  return (
    <div className="navigation">
      <header>
        <h1 className="logotype">Everyones Blog</h1>
      </header>
      <ul className="menu">
        {isLoggedIn ? (
          <>
            <li>
              <span>Hello {userEmail}</span>
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
