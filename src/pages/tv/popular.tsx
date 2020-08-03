import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { CardsList } from '@src/components/CardsList'
import { useHistory, useLocation } from 'react-router-dom'
import { tv } from '@src/store/modules/tv'
import { parseQueryString } from '@src/lib/parse_query_string'
import { TVCard } from '@src/components/CardsList/TVCard'
const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
})
export const Popular: React.FC = () => {
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
    getPopularTV(page).catch((err: any) => {
      if (err.status === 422) switchPage(1)
    })
  }, [page])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    switchPage(value)
  }
  return (
    <>
      <CardsList>
        {popularTV.data?.results?.map((el) => (
          <TVCard isLoading={popularTV.isLoading} key={el.id} card={el} />
        ))}
      </CardsList>
      <Pagination
        className={classes.pagination}
        count={popularTV.data?.total_pages}
        page={page}
        color="primary"
        size="large"
        onChange={handleChange}
      />
    </>
  )
}
