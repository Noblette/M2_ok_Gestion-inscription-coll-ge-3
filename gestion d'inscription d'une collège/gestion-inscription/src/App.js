import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./index.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ClassesPage from "./pages/ClassesPage";
import ElevesPage from "./pages/ElevesPage";
import InscriptionsPage from "./pages/InscriptionsPage";
import UsersPage from "./pages/UsersPage";
//user dashboard
//import UserElevesList from "./pages/UserElevesList";
import UserElevesList from "./pages/UserElevesList";
import UserClassesList from "./pages/UserClassesList";     // ✅ À créer
import UserInscriptionsList from "./pages/UserInscriptionsList"; // ✅ À créer
import UserUsersList from "./pages/UserUsersList";//pour user, liste de tous user

const Layout = ({ children }) => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/register-admin";

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {!hideLayout && <Header />}
      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
};

const ProtectedRoute = ({ children, allowedRole }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/login" />;

  return children;
};

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route
          path="/register-admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <RegisterAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRole="admin" >
              <UsersPage />
            </ProtectedRoute>
          }
        />

        {/* User */}
        {/* <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="user">
              <DashboardUser />
            </ProtectedRoute>
          }
        /> */}

        {/* CRUD pages disponibles selon rôle */}
        <Route
          path="/classes"
          element={
            <ProtectedRoute allowedRole="admin">
              <ClassesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eleves"
          element={
            <ProtectedRoute>
              <ElevesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inscriptions"
          element={
            <ProtectedRoute>
              <InscriptionsPage />
            </ProtectedRoute>
          }
        />


        {/* USER READ-ONLY */}
        <Route path="/user" element={<ProtectedRoute allowedRole="user"><DashboardUser /></ProtectedRoute>} />
        <Route path="/user/eleves" element={<ProtectedRoute allowedRole="user"><UserElevesList /></ProtectedRoute>} />
        <Route path="/user/classes" element={<ProtectedRoute allowedRole="user"><UserClassesList /></ProtectedRoute>} />
        <Route path="/user/inscriptions" element={<ProtectedRoute allowedRole="user"><UserInscriptionsList /></ProtectedRoute>} />
        <Route path="/user/users" element={<ProtectedRoute allowedRole="user"><UserUsersList /></ProtectedRoute>} />


        

        {/* Form pages si vous les gardez encore */}
        <Route
          path="/classes/new"
          element={
            <ProtectedRoute allowedRole="admin">
              <div className="p-6">Form classe</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/eleves/new"
          element={
            <ProtectedRoute>
              <div className="p-6">Form élève</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inscriptions/new"
          element={
            <ProtectedRoute>
              <div className="p-6">Form inscription</div>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />


        
        


      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
//à améliorer ty nohonle choix dashboardUser à améliorer