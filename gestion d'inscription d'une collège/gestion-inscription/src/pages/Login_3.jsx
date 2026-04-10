import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, motdepasse });
      login(res.data.token, res.data.role);

      window.location.href = res.data.role === "admin" ? "/admin" : "/user";
    } catch (err) {
      setMessage("❌ Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.373_0.034_259.733)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-md overflow-hidden">
        <div className="bg-[oklch(0.373_0.034_259.733)] px-8 py-6 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight">🔐 Connexion</h2>
          <p className="mt-2 text-sm text-white/80">
            Connectez-vous à votre espace
          </p>
        </div>

        <div className="px-8 py-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Adresse email
              </label>
              <input
                type="email"
                placeholder="Adresse email"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                  value={motdepasse}
                  onChange={(e) => setMotdepasse(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 transition hover:text-slate-700"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[oklch(0.373_0.034_259.733)] px-4 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:opacity-95 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.2]"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 space-y-3 text-center">
            <Link
              to="/register"
              className="block rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Pas de compte ? S&apos;inscrire
            </Link>

            <Link
              to="/forgot-password"
              className="inline-block text-sm text-slate-500 transition hover:text-slate-700 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {message && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
//encore à améliorer avec sweetAlert