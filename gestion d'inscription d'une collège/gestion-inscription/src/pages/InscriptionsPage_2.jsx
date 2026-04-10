import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  getInscriptions,
  createInscription,
  deleteInscription,
} from "../api/inscriptionsApi";
import { getEleves } from "../api/elevesApi";
import { getClasses } from "../api/classesApi";
import {
  ClipboardDocumentCheckIcon,
  TrashIcon,
  PlusIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const InscriptionsPage = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [eleves, setEleves] = useState([]);
  const [classes, setClasses] = useState([]);
  const [eleveId, setEleveId] = useState("");
  const [classeId, setClasseId] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const insRes = await getInscriptions();
    const elRes = await getEleves();
    const clRes = await getClasses();

    setInscriptions(insRes.data);
    setEleves(elRes.data);
    setClasses(clRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setEleveId("");
    setClasseId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createInscription({ eleve: eleveId, classe: classeId });

      await Swal.fire({
        icon: "success",
        title: "Inscription ajoutée",
        text: "L'inscription a été créée avec succès.",
        confirmButtonColor: "#0f172a",
      });

      resetForm();
      load();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de créer l'inscription.",
        confirmButtonColor: "#0f172a",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Supprimer cette inscription ?",
      text: "Cette action est irréversible.",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
    });

    if (result.isConfirmed) {
      try {
        await deleteInscription(id);
        await Swal.fire({
          icon: "success",
          title: "Supprimée",
          text: "L'inscription a été supprimée.",
          timer: 1500,
          showConfirmButton: false,
        });
        load();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible de supprimer l'inscription.",
          confirmButtonColor: "#0f172a",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-slate-700 shadow-md transition hover:shadow-lg"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Retour au dashboard
          </Link>
        </div>

        <div className="mb-8 rounded-3xl bg-[oklch(0.373_0.034_259.733)] px-6 py-8 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <ClipboardDocumentCheckIcon className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Gestion des inscriptions</h2>
          </div>
          <p className="mt-2 text-white/80">
            Ajouter et supprimer les inscriptions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-1">
            <h3 className="mb-6 text-xl font-semibold text-slate-800">
              Nouvelle inscription
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Élève
                </label>
                <select
                  value={eleveId}
                  onChange={(e) => setEleveId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                  required
                >
                  <option value="">-- Choisir un élève --</option>
                  {eleves.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.nom} {e.prenom}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Classe
                </label>
                <select
                  value={classeId}
                  onChange={(e) => setClasseId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                  required
                >
                  <option value="">-- Choisir une classe --</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.nom}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[oklch(0.373_0.034_259.733)] px-4 py-3 font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <PlusIcon className="h-5 w-5" />
                Ajouter inscription
              </button>
            </form>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-800">
                Liste des inscriptions
              </h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {inscriptions.length} inscription(s)
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Classe
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Élève
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {inscriptions.length > 0 ? (
                    inscriptions.map((i) => (
                      <tr key={i._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 text-slate-800">
                          {i.classe?.nom || "-"}
                        </td>
                        <td className="px-4 py-4 text-slate-800">
                          {i.eleve?.nom} {i.eleve?.prenom}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => handleDelete(i._id)}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-100 px-3 py-2 text-red-700 transition hover:bg-red-200"
                          >
                            <TrashIcon className="h-5 w-5" />
                            Trash
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        Aucune inscription trouvée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InscriptionsPage;
//à améliorer