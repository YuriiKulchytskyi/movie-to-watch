import { Outlet, useNavigate } from "react-router-dom";
import { GenreList } from "../components/GanreList/GanreList";
import { Filter } from "../components/Filter/Filter";

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={(): void => {
          navigate("/");
        }}
      >
        Main
      </button>
      <Filter />
      <GenreList />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
