import { useNavigate } from "react-router";
import type { Movie } from "../../types/movie";
import { formatedDate } from "../../utils/formatedDate";

export const MovieItem = ({ item }: { item: Movie }) => {
  const navigate = useNavigate();

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
          {/* <p className="overview">{item.overview}</p> */}
          <p>{formatedDate(item.release_date)}</p>
          {/* <div>
            <p>{item.vote_average}</p>
            <p>{item.vote_count}</p>
          </div> */}
        </div>
      </div>
    </li>
  );
};
