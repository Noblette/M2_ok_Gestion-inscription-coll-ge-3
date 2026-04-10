import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/usersApi";
import {
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
  PlusIcon,
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [role, setRole] = useState("user");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* const load = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Erreur chargement users:", error);
    }
  }; */
  const load = async () => {
    try {
      console.log("🔄 Chargement users...");
      const res = await getUsers();
      console.log("✅ Users reçus:", res.data);
      console.log("test data");
      setUsers(res.data);
    } catch (error) {
      console.error("❌ Erreur users:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setNom("");
    setEmail("");
    setMotdepasse("");
    setRole("user");
    setEditId(null);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Validation
      if (!nom || !email) {
        Swal.fire({
          icon: "warning",
          title: "Champs requis",
          text: "Nom et email obligatoires.",
        });
        return;
      }

      const data = {
        nom,
        email,
        role,
        ...(motdepasse && { motdepasse }), // Nouveau mot de passe seulement si rempli
      };

      if (editId) {
        await updateUser(editId, data);
        await Swal.fire({
          icon: "success",
          title: "Utilisateur modifié",
          text: "Compte mis à jour avec succès.",
          confirmButtonColor: "#0f172a",
        });
      } else {
        if (!motdepasse) {
          Swal.fire({
            icon: "warning",
            title: "Mot de passe requis",
            text: "Veuillez définir un mot de passe pour le nouvel utilisateur.",
          });
          return;
        }
        await createUser(data);
        await Swal.fire({
          icon: "success",
          title: "Utilisateur créé",
          text: "Nouveau compte créé avec succès.",
          confirmButtonColor: "#0f172a",
        });
      }

      resetForm();
      load();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error.response?.data?.message || "Erreur lors de l'enregistrement.",
        confirmButtonColor: "#0f172a",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (u) => {
    setNom(u.nom);
    setEmail(u.email);
    setRole(u.role);
    setEditId(u._id);
    setMotdepasse(""); // Ne pré-remplit pas le mot de passe
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Supprimer cet utilisateur ?",
      text: "Cette action est irréversible.",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        await Swal.fire({
          icon: "success",
          title: "Supprimé",
          text: "L'utilisateur a été supprimé.",
          timer: 1500,
          showConfirmButton: false,
        });
        load();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible de supprimer l'utilisateur.",
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
            <h2 className="text-3xl font-bold">Gestion des utilisateurs</h2>
          </div>
          <p className="mt-2 text-white/80">
            Créer, modifier et supprimer les comptes utilisateurs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Formulaire */}
          <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-1">
            <h3 className="mb-6 text-xl font-semibold text-slate-800">
              {editId ? "Modifier utilisateur" : "Nouvel utilisateur"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <UserIcon className="inline h-4 w-4" />
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <EnvelopeIcon className="inline h-4 w-4" />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nouveau mot de passe
                  {editId && (
                    <span className="ml-2 text-xs text-slate-500">
                      (optionnel)
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={editId ? "Laisser vide pour garder l'ancien" : "Mot de passe"}
                    value={motdepasse}
                    onChange={(e) => setMotdepasse(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                    required={!editId}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  <ShieldCheckIcon className="inline h-4 w-4" />
                  Rôle
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-[oklch(0.373_0.034_259.733)] focus:ring-4 focus:ring-[oklch(0.373_0.034_259.733)/0.15]"
                >
                  <option value="user">👤 Utilisateur</option>
                  <option value="admin">👨‍💼 Administrateur</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[oklch(0.373_0.034_259.733)] px-4 py-3 font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PlusIcon className="h-5 w-5" />
                  {editId ? "Modifier" : "Créer"}
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
                Liste des utilisateurs
              </h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {users.length} utilisateur(s)
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
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                      Rôle
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {users.length > 0 ? (
                    users.map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 font-medium text-slate-800">
                          {u.nom}
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {u.email}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              u.role === "admin"
                                ? "bg-[oklch(0.373_0.034_259.733)] text-white"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {u.role === "admin" ? "👨‍💼 Admin" : "👤 User"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(u)}
                              className="inline-flex items-center gap-2 rounded-xl bg-amber-100 px-3 py-2 text-amber-700 transition hover:bg-amber-200"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                              Edit
                            </button>
                            {u.role !== "admin" && (
                              <button
                                onClick={() => handleDelete(u._id)}
                                className="inline-flex items-center gap-2 rounded-xl bg-red-100 px-3 py-2 text-red-700 transition hover:bg-red-200"
                              >
                                <TrashIcon className="h-5 w-5" />
                                Supprimer
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-8 text-center text-slate-500">
                        Aucun utilisateur trouvé.
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

export default UsersPage;
//à ameliorer: miala ny choix supprimer pour roile admin