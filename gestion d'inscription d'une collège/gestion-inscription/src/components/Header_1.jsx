import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, role, logout } = useContext(AuthContext);

  return (
    <header>
      <h1>Gestion des inscriptions</h1>

      {user ? (
        <nav>
          {role === "admin" && <a href="/dashboard-admin">Admin</a>}
          {role === "user" && <a href="/dashboard-user">Utilisateur</a>}
          <button onClick={logout}>Déconnexion</button>
        </nav>
      ) : (
        <nav>
          <a href="/login">Connexion</a>
          <a href="/register">Inscription</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
//à améliorer