import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import '../index.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, motdepasse });
      login(res.data.token, res.data.role);

      window.location.href =
        res.data.role === "admin" ? "/admin" : "/user";
    } catch (err) {
      setMessage("❌ Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          🔐 Connexion
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Adresse email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 border rounded-lg"
            value={motdepasse}
            onChange={(e) => setMotdepasse(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-600 underline">
            Pas de compte ? S'inscrire
          </Link>
        </div>

        <div className="mt-2 text-center">
          <Link to="/forgot-password" className="text-gray-600 underline text-sm">
            Mot de passe oublié ?
          </Link>
        </div>

        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
//amélioration zao
