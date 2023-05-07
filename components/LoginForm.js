import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    return res;
  }

  return (
    <form onSubmit={login}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-white p-2 px-4 rounded-lg w-40 mb-2">
        Login
      </button>
    </form>
  );
}
