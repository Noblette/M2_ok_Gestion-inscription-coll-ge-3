import { useEffect, useState } from "react";
import {
  getClasses,
  createClasse,
  updateClasse,
  deleteClasse
} from "../api/classesApi";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [nom, setNom] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getClasses();
    setClasses(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateClasse(editId, { nom });
    } else {
      await createClasse({ nom });
    }

    setNom("");
    setEditId(null);
    load();
  };

  const handleDelete = async (id) => {
    await deleteClasse(id);
    load();
  };

  return (
    <div>
      <h2>📘 Gestion des classes</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom classe"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <button>{editId ? "Modifier" : "Ajouter"}</button>
      </form>

      <ul>
        {classes.map((c) => (
          <li key={c._id}>
            {c.nom}

            <button onClick={() => {
              setNom(c.nom);
              setEditId(c._id);
            }}>
              Modifier
            </button>

            <button onClick={() => handleDelete(c._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesPage;
//à améliorer