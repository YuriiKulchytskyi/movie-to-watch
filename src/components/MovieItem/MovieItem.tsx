import { useNavigate } from "react-router";
import type { Movie } from "../../types/movie";
import { formatedDate } from "../../utils/formatedDate";
import { useEffect, useState } from "react";
import { removeFromFavorites } from "../../utils/removeFromFavorites";
import { addToFavorites } from "../../utils/addToFavorite";
import { auth } from "../../firebase";
import "./MovieItem.scss";
import noPoster from "../../images/no-poster.svg";

export const MovieItem = ({ item }: { item: Movie }) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkFavorite = async () => {
      const { isFavorite } = await import("../../utils/isFavorite");
      const result = await isFavorite(item.id);
      setFavorite(result);
    };
    checkFavorite();
  }, [item.id]);

  return (
    <li className="movie-card">
      <div
        className="movie-card-inner"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/movie/${item.id}`);
        }}
      >
        <img
          className="movie-poster"
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : noPoster
          }
          alt={item.original_title}
          loading="lazy"
        />

        <div className="movie-overlay">
          <h3>{item.title}</h3>
          <p>{formatedDate(item.release_date)}</p>
        </div>

        {auth.currentUser && (
          <button
            className="favorite-btn"
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
            {favorite ? "💔" : "❤️"}
          </button>
        )}
      </div>
    </li>
  );
};
