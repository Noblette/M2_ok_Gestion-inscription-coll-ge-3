import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const { user, role, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Déconnexion",
      text: "Voulez-vous vraiment vous déconnecter ?",
      showCancelButton: true,
      confirmButtonText: "Oui, déconnecter",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#64748b",
    });

    if (result.isConfirmed) {
      logout();
      Swal.fire({
        icon: "success",
        title: "Déconnecté",
        text: "Vous avez été déconnecté avec succès.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[oklch(0.373_0.034_259.733)] text-white shadow-lg shadow-slate-900/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">
            Gestion des inscriptions
          </h1>
          <p className="text-xs text-white/70">Application de gestion</p>
        </div>

        {user ? (
          <nav className="flex items-center gap-3">
            {role === "admin" && (
              <Link
                to="/admin"
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20"
              >
                Admin
              </Link>
            )}
            {role === "user" && (
              <Link
                to="/user"
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20"
              >
                Utilisateur
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Déconnexion
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[oklch(0.373_0.034_259.733)] transition hover:bg-slate-100"
            >
              Inscription
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;