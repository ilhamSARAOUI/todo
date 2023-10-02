import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook
import { signIn } from "next-auth/react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (response.status == 401) {
      setLoginError(true);
      return;
    }
    router.push("/tasks");
  };

  return (
    <center>
      <div className="login-form">
        <div>
          <h1>Login</h1>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="input">
            <input
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loginError && (
            <p className="error-message">incorrect email or password</p>
          )}
          <br />
          <br />
          <div className="input">
            <button onClick={handleLogin}>Login</button>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <center id="no-account">
            You don't have an account?
            <Link href="/signup">Sign up</Link>
          </center>
        </div>
      </div>
    </center>
  );
}

export default Login;
