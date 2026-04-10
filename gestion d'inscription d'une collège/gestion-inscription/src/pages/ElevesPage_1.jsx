import { useEffect, useState } from "react";
import {
  getEleves,
  createEleve,
  updateEleve,
  deleteEleve
} from "../api/elevesApi";

const ElevesPage = () => {
  const [eleves, setEleves] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getEleves();
    setEleves(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { nom, prenom };

    if (editId) {
      await updateEleve(editId, data);
    } else {
      await createEleve(data);
    }

    setNom("");
    setPrenom("");
    setEditId(null);

    load();
  };

  const handleDelete = async (id) => {
    await deleteEleve(id);
    load();
  };

  return (
    <div>
      <h2>🧑‍🎓 Gestion des élèves</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>
      </form>

      <ul>
        {eleves.map((e) => (
          <li key={e._id}>
            {e.nom} {e.prenom}

            <button onClick={() => {
              setNom(e.nom);
              setPrenom(e.prenom);
              setEditId(e._id);
            }}>
              Modifier
            </button>

            <button onClick={() => handleDelete(e._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ElevesPage;
//à améliorer