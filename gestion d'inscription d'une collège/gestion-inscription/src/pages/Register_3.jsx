import { useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [role] = useState("user");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", {
        nom,
        email,
        motdepasse,
        role,
      });
      setMessage("Compte créé !");
    } catch (err) {
      setMessage("Erreur: email déjà utilisé");
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.373_0.034_259.733)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-md overflow-hidden">
        <div className="bg-[oklch(0.373_0.034_259.733)] px-8 py-6 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight">Créer un compte</h2>
          <p className="mt-2 text-sm text-white/80">
            Inscription utilisateur
          </p>
        </div>

        <div className="px-8 py-8">
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nom
              </label>
              <input
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Adresse email
              </label>
              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
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
                  value={motdepasse}
                  onChange={(e) => setMotdepasse(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
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
              S&apos;inscrire
            </button>
          </form>

          <div className="mt-6">
            <Link
              to="/login"
              className="block rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Se connecter
            </Link>
          </div>

          {message && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
//Encore à Ameliorer