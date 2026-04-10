import { useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const RegisterAdmin = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleRegisterAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register-admin", {
        nom,
        email,
        motdepasse,
        role,
      });
      setMessage("Compte créé !");
    } catch (err) {
      setMessage("Erreur lors de la création");
    }
  };

  return (
    <div className="form-container">
      <h2>Créer un utilisateur / admin</h2>

      <form onSubmit={handleRegisterAdmin}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={motdepasse}
          onChange={(e) => setMotdepasse(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>

        <button type="submit">Créer</button>
        <Link to="/register" className="button-link">
          Se Connecter
        </Link>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterAdmin;
//amélioration zao