import './GanreList.scss'
import type { Genre } from "../../types/movie"

export const GenreList = ({genres} : {genres: Genre[]}) => {
  return (
          <ul className='list'>
        {genres.map((genre) => (
          <li key={genre.id}>
            <a href="">{genre.name}</a>
          </li>
        ))}
      </ul>
  )
}
