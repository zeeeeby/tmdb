import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { CardsList } from '@src/components/CardsList'
import { useHistory, useLocation } from 'react-router-dom'
import { movies } from '@src/store/modules/movies'
import { parseQueryString } from '@src/lib/parse_query_string'
const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
})
export const Upcoming: React.FC = () => {
  const classes = useStyles()
  const upcoming = movies.useUpcoming()
  const history = useHistory()
  const params = useLocation()
  let pageNumber = parseQueryString(params.search).page || 1

  const [page, setPage] = React.useState(parseInt(pageNumber))
  const { getUpcomingMovies } = movies.useActions()

  const switchPage = (page: number) => {
    setPage(page)
    history.push(`?page=${page}`)
  }

  React.useEffect(() => {
    //@ts-ignore
    getUpcomingMovies(page).catch((err: any) => {
      if (err?.status === 422) switchPage(1)
    })
  }, [page])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    switchPage(value)
  }
  return (
    <>
      <CardsList cards={upcoming?.results} cardType="movie" />
      <Pagination
        className={classes.pagination}
        count={upcoming?.total_pages}
        page={page}
        color="primary"
        size="large"
        onChange={handleChange}
      />
    </>
  )
}
