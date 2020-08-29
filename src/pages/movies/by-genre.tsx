import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { CardsList } from '@src/components/CardsList'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { movies } from '@src/store/modules/movies'
import { parseQueryString } from '@src/lib/parse_query_string'
import { MovieCard } from '@src/components/CardsList/MovieCard'
import { useTranslation } from 'react-i18next'
const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
})
export const ByGenre: React.FC = () => {
  const classes = useStyles()
  const movi = movies.useDiscovered()
  const history = useHistory()
  const params = useLocation()
  let pageNumber = parseQueryString(params.search).page || 1

  const [page, setPage] = React.useState(parseInt(pageNumber))

  const matchedParams = useRouteMatch().params as { genre: string }
  const genre_id = matchedParams.genre
  const { getDiscoveredMovies } = movies.useActions()

  const switchPage = (page: number) => {
    setPage(page)
    history.push(`?page=${page}`)
  }
  const [t, i18n] = useTranslation()
  React.useEffect(() => {
    getDiscoveredMovies({ with_genres: genre_id, page })
  }, [page, genre_id, i18n.language])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    switchPage(value)
  }
  return (
    <>
      <CardsList>
        {movi.data?.results?.map((el) => (
          <MovieCard isLoading={movi.isLoading} key={el.id} card={el} />
        ))}
      </CardsList>
      <Pagination
        className={classes.pagination}
        count={movi?.data?.total_pages}
        page={page}
        color="primary"
        size="large"
        onChange={handleChange}
      />
    </>
  )
}
