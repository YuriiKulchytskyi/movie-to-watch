import { Outlet, useNavigate } from "react-router-dom";
import { GenreList } from "../components/GanreList/GanreList";
import { Filter } from "../components/Filter/Filter";
import { handleLogout } from "../utils/logOut";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";
import "./Pages.scss";
import { Toaster } from "react-hot-toast";

export const Layout = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#151515",
            color: "#fff",
            border: "1px solid #333",
          },
        }}
      />
      <header className="app-header">
        <button className="burger" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <nav className={`mobile-menu ${open ? "open" : ""}`}>
          <button onClick={() => navigate("/")}>Main</button>

          <button onClick={() => navigate("/favorites")}>Favorites</button>

          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate("/auth")}>Sign Up / Log In</button>
          )}
        </nav>
        <div className="nav-left">
          <button onClick={() => navigate("/")}>🎬 Movies</button>
        </div>

        <div className="nav-center">
          <Filter />
          <GenreList />
        </div>

        <div className="nav-right">
          {user && (
            <button onClick={() => navigate("/favorites")}>❤️ Favorites</button>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <button onClick={() => navigate("/auth")}>Sign Up</button>
              <button onClick={() => navigate("/login")}>Log In</button>
            </>
          )}
        </div>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
};
