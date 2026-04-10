import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const DashboardAdmin = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Déconnexion",
      text: "Voulez-vous vraiment quitter l'administration ?",
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
          <h1 className="text-3xl font-bold">👨‍💼 Tableau de bord Admin</h1>
          <p className="mt-2 text-white/80">
            Gérez les classes, les élèves et les inscriptions.
          </p>
        </div>

        {/* <div className="grid gap-6 md:grid-cols-3"> */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/classes"
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-slate-800">Gérer les classes</h2>
            <p className="mt-2 text-sm text-slate-500">
              Ajouter, modifier ou supprimer les classes.
            </p>
          </Link>

          <Link
            to="/eleves"
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-slate-800">Gérer les élèves</h2>
            <p className="mt-2 text-sm text-slate-500">
              Administrer les fiches élèves.
            </p>
          </Link>

          <Link
            to="/inscriptions"
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-slate-800">Gérer les inscriptions</h2>
            <p className="mt-2 text-sm text-slate-500">
              Suivre et valider les inscriptions.
            </p>
          </Link>

           <Link
              to="/users"
              className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-slate-800">👥 Gérer les utilisateurs</h2>
              <p className="mt-2 text-sm text-slate-500">
                Créer, modifier et gérer les comptes.
              </p>
            </Link>
        </div>

        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;