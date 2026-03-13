import { Outlet, useNavigate } from "react-router-dom";
import { GenreList } from "../components/GanreList/GanreList";
import { Filter } from "../components/Filter/Filter";
import { handleLogout } from "../utils/logOut";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";

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
    <div>
      <button
        onClick={(): void => {
          navigate("/");
        }}
      >
        Main
      </button>

      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/auth");
            }}
          >
            Sign Up/Log In
          </button>
        </>
      )}
      <Filter />
      <GenreList />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
