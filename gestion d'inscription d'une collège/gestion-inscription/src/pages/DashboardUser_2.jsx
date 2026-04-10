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
            Accédez à vos informations et vos inscriptions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/eleves"
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-slate-800">Liste des élèves</h2>
            <p className="mt-2 text-sm text-slate-500">
              Consulter les élèves enregistrés.
            </p>
          </Link>

          <Link
            to="/inscriptions"
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-slate-800">Liste des inscriptions</h2>
            <p className="mt-2 text-sm text-slate-500">
              Voir les inscriptions disponibles.
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

export default DashboardUser;
//amboarina mihintsy ty fa tsy ao, lasa ny an'i admin avao koa le page ao de tsy mety @ le resaka autorisation