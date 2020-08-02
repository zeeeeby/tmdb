import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { CardsList } from '@src/components/CardsList'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { parseQueryString } from '@src/lib/parse_query_string'
import { MovieCard } from '@src/components/CardsList/MovieCard'
import {
  TPopularMovies,
  TUpcomingMovies,
  TNowPlayingMovies,
  TTopRatedMovies,
  TRecommendations,
  TSimilarMovies,
} from '@src/store/modules/movies/types'
const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
})
type T = {
  content:
    | TUpcomingMovies
    | TPopularMovies
    | TNowPlayingMovies
    | TTopRatedMovies
    | TRecommendations
    | TSimilarMovies
    | null
  getter: (...args: any[]) => any
  withURLParam?: boolean
}
export const Page: React.FC<T> = ({ content, getter, withURLParam }) => {
  const classes = useStyles()
  const history = useHistory()
  const params = useLocation()
  let pageNumber = parseQueryString(params.search).page || 1

  const [page, setPage] = React.useState(parseInt(pageNumber))

  const switchPage = (page: number) => {
    setPage(page)
    history.push(`?page=${page}`)
  }

  const matchedParams = useRouteMatch().params as any
  const movieID = parseInt(matchedParams.id || '-1')

  React.useEffect(() => {
    if (!withURLParam)
      //@ts-ignore
      getter(page).catch((err: any) => {
        if (err?.status === 422) switchPage(1)
      })
    else getter(movieID, page)
  }, [page, getter, movieID])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    switchPage(value)
  }
  return (
    <>
      <CardsList>
        {content?.results?.map((el) => (
          <MovieCard key={el.id} card={el} />
        ))}
      </CardsList>
      <Pagination
        className={classes.pagination}
        count={content?.total_pages}
        page={page}
        color="primary"
        size="large"
        onChange={handleChange}
      />
    </>
  )
}
