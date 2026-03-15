import { Outlet, useNavigate } from "react-router-dom";
import { GenreList } from "../components/GanreList/GanreList";
import { Filter } from "../components/Filter/Filter";
import { handleLogout } from "../utils/logOut";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";
import "./Pages.scss"

export const Layout = () => {
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
      <header className="app-header">

        <div className="nav-left">
          <button onClick={() => navigate("/")}>🎬 Movies</button>
        </div>

        <div className="nav-center">
          <Filter />
          <GenreList />
        </div>

        <div className="nav-right">
          <button onClick={() => navigate("/favorites")}>❤️ Favorites</button>

          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate("/auth")}>
              Sign Up / Log In
            </button>
          )}
        </div>

      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
};
