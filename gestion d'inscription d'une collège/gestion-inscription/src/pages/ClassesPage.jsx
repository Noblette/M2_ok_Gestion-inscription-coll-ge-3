import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  getClasses,
  createClasse,
  updateClasse,
  deleteClasse,
} from "../api/classesApi";
import {
  PencilSquareIcon,
  TrashIcon,
  AcademicCapIcon,
  PlusIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [nom, setNom] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await getClasses();
    setClasses(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setNom("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editId) {
        await updateClasse(editId, { nom });
        await Swal.fire({
          icon: "success",
          title: "Classe modifiée",
          text: "La classe a été mise à jour avec succès.",
          confirmButtonColor: "#0f172a",
        });
      } else {
        await createClasse({ nom });
        await Swal.fire({
          icon: "success",
          title: "Classe ajoutée",
          text: "La nouvelle classe a été créée avec succès.",
          confirmButtonColor: "#0f172a",
        });
      }

      resetForm();
      load();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible d'enregistrer la classe.",
        confirmButtonColor: "#0f172a",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (c) => {
    setNom(c.nom);
    setEditId(c._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Supprimer cette classe ?",
      text: "Cette action est irréversible.",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
    });

    if (result.isConfirmed) {
      try {
        await deleteClasse(id);
        await Swal.fire({
          icon: "success",
          title: "Supprimée",
          text: "La classe a été supprimée.",
          timer: 1500,
          showConfirmButton: false,
        });
        load();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible de supprimer la classe.",
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
            <AcademicCapIcon className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Gestion des classes</h2>
          </div>
          <p className="mt-2 text-white/80">
            Ajouter, modifier et supprimer les classes.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-1">
            <h3 className="mb-6 text-xl font-semibold text-slate-800">
              {editId ? "Modifier une classe" : "Ajouter une classe"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nom de la classe
                </label>
                <input
                  type="text"
                  placeholder="Ex: Terminale A"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[oklch(0.373_0.034_259.733)] px-4 py-3 font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PlusIcon className="h-5 w-5" />
                  {editId ? "Modifier" : "Ajouter"}
                </button>

                {editId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-800">
                Liste des classes
              </h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {classes.length} élément(s)
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Nom
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {classes.length > 0 ? (
                    classes.map((c) => (
                      <tr key={c._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 text-slate-800">{c.nom}</td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(c)}
                              className="inline-flex items-center gap-2 rounded-xl bg-amber-100 px-3 py-2 text-amber-700 transition hover:bg-amber-200"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(c._id)}
                              className="inline-flex items-center gap-2 rounded-xl bg-red-100 px-3 py-2 text-red-700 transition hover:bg-red-200"
                            >
                              <TrashIcon className="h-5 w-5" />
                              Trash
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        Aucune classe trouvée.
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

export default ClassesPage;