import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getEleves,
  createEleve,
  updateEleve,
  deleteEleve,
} from "../api/elevesApi";
import {
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
  PlusIcon,
  ArrowLeftIcon,
  UserIcon,
  CakeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const ElevesPage = () => {
  const [eleves, setEleves] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [sexe, setSexe] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [adresse, setAdresse] = useState("");
  const [classeId, setClasseId] = useState("");
  const [classes, setClasses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await getEleves();
    const classesRes = await fetch("/api/classes"); // ou votre api
    const classesData = await classesRes.json();
    setEleves(res.data);
    setClasses(classesData.data || classesData);
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setNom("");
    setPrenom("");
    setSexe("");
    setDateNaissance("");
    setAdresse("");
    setClasseId("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = {
        nom,
        prenom,
        sexe,
        dateNaissance,
        adresse,
        classe: classeId,
      };

      if (editId) {
        await updateEleve(editId, data);
        await Swal.fire({
          icon: "success",
          title: "Élève modifié",
          text: "Les informations ont été mises à jour.",
          confirmButtonColor: "#0f172a",
        });
      } else {
        await createEleve(data);
        await Swal.fire({
          icon: "success",
          title: "Élève ajouté",
          text: "Le nouvel élève a été créé avec succès.",
          confirmButtonColor: "#0f172a",
        });
      }

      resetForm();
      load();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible d'enregistrer l'élève.",
        confirmButtonColor: "#0f172a",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (e) => {
    setNom(e.nom);
    setPrenom(e.prenom);
    setSexe(e.sexe || "");
    setDateNaissance(e.dateNaissance ? new Date(e.dateNaissance).toISOString().split('T')[0] : "");
    setAdresse(e.adresse || "");
    setClasseId(e.classe?._id || e.classeId || "");
    setEditId(e._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Supprimer cet élève ?",
      text: "Cette action est irréversible.",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
    });

    if (result.isConfirmed) {
      try {
        await deleteEleve(id);
        await Swal.fire({
          icon: "success",
          title: "Supprimé",
          text: "L'élève a été supprimé.",
          timer: 1500,
          showConfirmButton: false,
        });
        load();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible de supprimer l'élève.",
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
            <UsersIcon className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Gestion des élèves</h2>
          </div>
          <p className="mt-2 text-white/80">
            Ajouter, modifier et supprimer les élèves.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Formulaire */}
          <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-1">
            <h3 className="mb-6 text-xl font-semibold text-slate-800">
              {editId ? "Modifier un élève" : "Ajouter un élève"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <UserIcon className="inline h-4 w-4" />
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <UserIcon className="inline h-4 w-4" />
                  Prénom
                </label>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Sexe
                </label>
                <select
                  value={sexe}
                  onChange={(e) => setSexe(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                >
                  <option value="">Sélectionner...</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <CakeIcon className="inline h-4 w-4" />
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={dateNaissance}
                  onChange={(e) => setDateNaissance(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <MapPinIcon className="inline h-4 w-4" />
                  Adresse
                </label>
                <textarea
                  placeholder="Adresse complète"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Classe
                </label>
                <select
                  value={classeId}
                  onChange={(e) => setClasseId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                >
                  <option value="">Sélectionner une classe...</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.nom}
                    </option>
                  ))}
                </select>
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

          {/* Tableau */}
          <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-800">
                Liste des élèves
              </h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {eleves.length} élève(s)
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Nom
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Prénom
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Sexe
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Classe
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {eleves.length > 0 ? (
                    eleves.map((e) => (
                      <tr key={e._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 text-slate-800">{e.nom}</td>
                        <td className="px-4 py-4 text-slate-800">{e.prenom}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              e.sexe === "M"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-pink-100 text-pink-800"
                            }`}
                          >
                            {e.sexe === "M" ? "M" : "F"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-800">
                          {e.classe?.nom || "-"}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(e)}
                              className="inline-flex items-center gap-2 rounded-xl bg-amber-100 px-3 py-2 text-amber-700 transition hover:bg-amber-200"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(e._id)}
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
                        colSpan="5"
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        Aucun élève trouvé.
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

export default ElevesPage;
//tokony ho ok fa nisy anle classe io nefa tsy ilaina
//bouton retour efa ato
//Date ok be