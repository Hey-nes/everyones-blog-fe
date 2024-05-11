const RegisterForm = () => {
  return (
    <div className="register-form-wrapper">
      <header>
        <h1>Register here</h1>
      </header>
      <div className="register-form">
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

export default RegisterForm;
