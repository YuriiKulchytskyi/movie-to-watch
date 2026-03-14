import { useNavigate } from "react-router";
import type { Movie } from "../../types/movie";
import { formatedDate } from "../../utils/formatedDate";
import { useEffect, useState } from "react";
import { removeFromFavorites } from "../../utils/removeFromFavorites";
import { addToFavorites } from "../../utils/addToFavorite";

export const MovieItem = ({
  item,
}: {
  item: Movie;
}) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkFavorite = async () => {
      const { isFavorite } = await import("../../utils/isFavorite");
      const result = await isFavorite(item.id);
      setFavorite(result);
    }
    checkFavorite();
  },[item.id]);

  return (
    <li key={item.id}>
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate(`/movie/${item.id}`);
        }}
      >
        {item.title}
      </div>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.original_title}
          loading="lazy"
        />
        <div>
          <p>{formatedDate(item.release_date)}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();

            if (favorite) {
              removeFromFavorites(item);
              setFavorite(false);
            } else {
              addToFavorites(item);
              setFavorite(true);
            }
          }}
        >
          {favorite ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </li>
  );
};
