import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { CardsList } from '@src/components/CardsList'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { tv } from '@src/store/modules/tv'
import { parseQueryString } from '@src/lib/parse_query_string'
import { TVCard } from '@src/components/CardsList/TVCard'
const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
})
export const ByGenre: React.FC = () => {
  const classes = useStyles()
  const tvs = tv.useDiscovered()
  const history = useHistory()
  const params = useLocation()
  let pageNumber = parseQueryString(params.search).page || 1

  const [page, setPage] = React.useState(parseInt(pageNumber))

  const matchedParams = useRouteMatch().params as { genre: string }
  const genre_id = matchedParams.genre
  const { getDiscoveredTV } = tv.useActions()

  const switchPage = (page: number) => {
    setPage(page)
    history.push(`?page=${page}`)
  }

  React.useEffect(() => {
    getDiscoveredTV({ with_genres: genre_id, page })
  }, [page, genre_id])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    switchPage(value)
  }
  return (
    <>
      <CardsList>
        {tvs.data?.results?.map((el) => (
          <TVCard isLoading={tvs.isLoading} key={el.id} card={el} />
        ))}
      </CardsList>
      <Pagination
        className={classes.pagination}
        count={tvs?.data?.total_pages}
        page={page}
        color="primary"
        size="large"
        onChange={handleChange}
      />
    </>
  )
}
