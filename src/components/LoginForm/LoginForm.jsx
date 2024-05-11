const loginForm = () => {
  return (
    <div className="login-form-wrapper">
      <header>
        <h1>Login here</h1>
      </header>
      <div className="login-form">
        <form>
          {" "}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default loginForm;
