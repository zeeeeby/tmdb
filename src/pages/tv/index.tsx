import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { CardsList } from '@src/components/CardsList'
import { useHistory, useLocation } from 'react-router-dom'
import { tv } from '@src/store/modules/tv'
import { parseQueryString } from '@src/lib/parse_query_string'
const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
})
export const TV: React.FC = () => {
  const classes = useStyles()
  const popularTV = tv.usePopular()
  const history = useHistory()
  const params = useLocation()
  let pageNumber = parseQueryString(params.search).page || 1

  const [page, setPage] = React.useState(parseInt(pageNumber))
  const { getPopularTV } = tv.useActions()

  const switchPage = (page: number) => {
    setPage(page)
    history.push(`?page=${page}`)
  }

  React.useEffect(() => {
    //@ts-ignore
    getPopularTV('', page).catch((err: any) => {
      if (err.status === 422) switchPage(1)
    })
  }, [page])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    switchPage(value)
  }
  return (
    <>
      <CardsList cards={popularTV?.results} cardType="tv" />
      <Pagination
        className={classes.pagination}
        count={popularTV?.total_pages}
        page={page}
        color="primary"
        size="large"
        onChange={handleChange}
      />
    </>
  )
}
