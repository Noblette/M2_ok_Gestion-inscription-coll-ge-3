import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getInscriptions,
  createInscription,
  updateInscription,
  deleteInscription,
} from "../api/inscriptionsApi";
import { getEleves } from "../api/elevesApi";
import { getClasses } from "../api/classesApi";
import {
  ClipboardDocumentCheckIcon,
  TrashIcon,
  PlusIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const InscriptionsPage = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [eleves, setEleves] = useState([]);
  const [classes, setClasses] = useState([]);
  const [eleveId, setEleveId] = useState("");
  const [classeId, setClasseId] = useState("");
  const [anneeScolaire, setAnneeScolaire] = useState("");
  const [frais, setFrais] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const load = async () => {
    try {
      const insRes = await getInscriptions();
      const elRes = await getEleves();
      const clRes = await getClasses();

      setInscriptions(insRes.data);
      setEleves(elRes.data);
      setClasses(clRes.data);
    } catch (error) {
      console.error("Erreur chargement:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Filtrer les inscriptions par recherche
  const filteredInscriptions = inscriptions.filter((i) =>
    i.classe?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.eleve?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.eleve?.prenom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setEleveId("");
    setClasseId("");
    setAnneeScolaire("");
    setFrais("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = {
        eleve: eleveId,
        classe: classeId,
        anneeScolaire,
        frais: parseFloat(frais),
      };

      if (editId) {
        await updateInscription(editId, data);
        await Swal.fire({
          icon: "success",
          title: "Inscription modifiée",
          text: "L'inscription a été mise à jour.",
          confirmButtonColor: "#0f172a",
        });
      } else {
        await createInscription(data);
        await Swal.fire({
          icon: "success",
          title: "Inscription ajoutée",
          text: "Nouvelle inscription créée avec succès.",
          confirmButtonColor: "#0f172a",
        });
      }

      resetForm();
      load();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible d'enregistrer l'inscriptionnn.",
        confirmButtonColor: "#0f172a",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (i) => {
    setEleveId(i.eleve?._id || i.eleve);
    setClasseId(i.classe?._id || i.classe);
    setAnneeScolaire(i.anneeScolaire || "");
    setFrais(i.frais || "");
    setEditId(i._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        {/* Bouton retour */}
        <div className="mb-6">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-slate-700 shadow-md transition hover:shadow-lg"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Retour au dashboard
          </Link>
        </div>

        {/* Titre principal */}
        <div className="mb-8 rounded-3xl bg-[oklch(0.373_0.034_259.733)] px-6 py-8 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <ClipboardDocumentCheckIcon className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Gestion des inscriptions</h2>
          </div>
          <p className="mt-2 text-white/80">
            Ajouter, modifier et supprimer les inscriptions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Formulaire */}
          <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-1">
            <h3 className="mb-6 text-xl font-semibold text-slate-800">
              {editId ? "Modifier inscription" : "Nouvelle inscription"}
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

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Année scolaire
                </label>
                <input
                  type="text"
                  placeholder="2026-2027"
                  value={anneeScolaire}
                  onChange={(e) => setAnneeScolaire(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {/* Frais (€) */}
                  Frais (Ar)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="500"
                  value={frais}
                  onChange={(e) => setFrais(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
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

          {/* Tableau + recherche */}
          <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-2">
            <div className="mb-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher par classe ou élève..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                />
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-800">
                Liste des inscriptions
              </h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {filteredInscriptions.length} résultat(s)
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
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Année
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Frais
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Date inscription
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredInscriptions.length > 0 ? (
                    filteredInscriptions.map((i) => (
                      <tr key={i._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 text-slate-800">
                          {i.classe?.nom || "-"}
                        </td>
                        <td className="px-4 py-4 text-slate-800">
                          {i.eleve?.nom} {i.eleve?.prenom}
                        </td>
                        <td className="px-4 py-4 text-slate-800">
                          {i.anneeScolaire || "-"}
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-semibold text-emerald-600">
                            {/* {i.frais ? `${i.frais.toFixed(2)} €` : "-"} */}
                            {i.frais ? `${i.frais.toFixed(2)} Ar` : "-"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {i.dateInscription
                            ? new Date(i.dateInscription).toLocaleDateString("fr-FR")
                            : "-"}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(i)}
                              className="inline-flex items-center gap-2 rounded-xl bg-amber-100 px-3 py-2 text-amber-700 transition hover:bg-amber-200"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(i._id)}
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
                        colSpan="6"
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
//confusion avec modification dans handleSubmit