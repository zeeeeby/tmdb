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
import { TResponseError } from '@src/api/types'
const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
})
type T = {
  content: {
    data:
      | TUpcomingMovies
      | TPopularMovies
      | TNowPlayingMovies
      | TTopRatedMovies
      | TRecommendations
      | TSimilarMovies
      | null
    isLoading: boolean
    error: TResponseError | null
  }

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
    if (!withURLParam) getter(page)
    else getter(movieID, page)
  }, [page, getter, movieID])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    switchPage(value)
  }
  return (
    <>
      <CardsList>
        {content.data?.results?.map((el) => (
          <MovieCard isLoading={content.isLoading} key={el.id} card={el} />
        ))}
      </CardsList>
      <Pagination
        className={classes.pagination}
        count={content.data?.total_pages}
        page={page}
        color="primary"
        size="large"
        onChange={handleChange}
      />
    </>
  )
}
