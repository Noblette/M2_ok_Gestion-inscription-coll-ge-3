import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const DashboardUser = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Déconnexion",
      text: "Voulez-vous vraiment quitter votre session ?",
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
        text: "À bientôt !",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 rounded-3xl bg-[oklch(0.373_0.034_259.733)] px-6 py-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold">👤 Tableau de bord Utilisateur</h1>
          <p className="mt-2 text-white/80">
            Consultez les listes des données de l'école.
          </p>
        </div>

        {/* ✅ 4 CARTES */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Link
            to="/user/eleves"
            className="group rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-800">📚 Élèves</h2>
            </div>
            <p className="text-sm text-slate-500">Liste complète des élèves</p>
          </Link>

          <Link
            to="/user/classes"
            className="group rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-xl group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-8 3h15M9 19v-1a2 2 0 00-2-2H5a2 2 0 00-2 2v1" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-800">🏫 Classes</h2>
            </div>
            <p className="text-sm text-slate-500">Toutes les classes disponibles</p>
          </Link>

          <Link
            to="/user/inscriptions"
            className="group rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-800">📋 Inscriptions</h2>
            </div>
            <p className="text-sm text-slate-500">Toutes les inscriptions actives</p>
          </Link>

          <Link
            to="/user/users"
            className="group rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-xl group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-800">👥 Utilisateurs</h2>
            </div>
            <p className="text-sm text-slate-500">Liste des comptes utilisateurs</p>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-8 py-3 font-semibold text-white shadow-lg hover:bg-red-600 transition-all"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;