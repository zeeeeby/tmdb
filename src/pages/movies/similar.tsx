import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { CardsList } from '@src/components/CardsList'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { movies } from '@src/store/modules/movies'
import { parseQueryString } from '@src/lib/parse_query_string'
const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
})
export const Similar: React.FC = () => {
  const classes = useStyles()
  const similarMovies = movies.currentMovie.useSimilar()
  const history = useHistory()
  const location = useLocation()
  let pageNumber = parseQueryString(location.search).page || 1

  const [page, setPage] = React.useState(parseInt(pageNumber))
  const { getSimilarMovies } = movies.useActions()

  const matchedParams = useRouteMatch().params as { id: string }

  let movieID = parseInt(matchedParams.id || '1')

  const switchPage = (page: number) => {
    setPage(page)
    history.push(`?page=${page}`)
  }

  React.useEffect(() => {
    //@ts-ignore
    getSimilarMovies(movieID, page).catch((err: any) => {
      if (err?.status === 422) switchPage(1)
    })
  }, [page, movieID])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    switchPage(value)
  }
  return (
    <>
      <CardsList cards={similarMovies?.results} cardType="movie" />
      <Pagination
        className={classes.pagination}
        count={similarMovies?.total_pages}
        page={page}
        color="primary"
        size="large"
        onChange={handleChange}
      />
    </>
  )
}
