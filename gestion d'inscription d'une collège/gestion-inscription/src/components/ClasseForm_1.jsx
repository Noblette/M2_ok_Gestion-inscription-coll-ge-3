import { useState, useEffect } from "react";
import api from "../api/axios";

const ClasseForm = ({ initialData = null, onSuccess }) => {
  const [nom, setNom] = useState("");

  useEffect(() => {
    if (initialData) {
      setNom(initialData.nom);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialData) {
        await api.put(`/classes/${initialData._id}`, { nom });
      } else {
        await api.post("/classes", { nom });
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData ? "Modifier Classe" : "Ajouter Classe"}</h3>

      <label>Nom de la classe :</label>
      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />

      <button type="submit">{initialData ? "Modifier" : "Créer"}</button>
    </form>
  );
};

export default ClasseForm;
//à améliorer