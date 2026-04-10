import { useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const RegisterAdmin = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register-admin", {
        nom,
        email,
        motdepasse,
        role,
      });

      Swal.fire({
        icon: "success",
        title: "Compte créé !",
        text: "L'utilisateur / admin a bien été enregistré.",
        confirmButtonText: "OK",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la création.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.373_0.034_259.733)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-md overflow-hidden">
        <div className="bg-[oklch(0.373_0.034_259.733)] px-8 py-6 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight">
            Créer un utilisateur / admin
          </h2>
          <p className="mt-2 text-sm text-white/80">Gestion des comptes</p>
        </div>

        <div className="px-8 py-8">
          <form onSubmit={handleRegisterAdmin} className="space-y-5">
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
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
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

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Rôle
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[oklch(0.373_0.034_259.733)] px-4 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:opacity-95 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.2]"
            >
              Créer
            </button>
          </form>

          <div className="mt-6">
            <Link
              to="/register"
              className="block rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Retour à l&apos;inscription
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
//tsy nilaina koa ty fa fa efa @ userPage ao ny admin