import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { CardsList } from '@src/components/CardsList'
import { useHistory, useLocation } from 'react-router-dom'
import { search } from '@src/store/modules/search'
import { parseQueryString } from '@src/lib/parse_query_string'
import { MovieCard } from '@src/components/CardsList/MovieCard'
import { TVCard } from '@src/components/CardsList/TVCard'
import { CardItem } from '@src/components/CardsList/CardItem'
const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
})
export const Search: React.FC = () => {
  const classes = useStyles()
  const searchRes = search.useResult()
  const history = useHistory()
  const params = useLocation()
  let pageNumber = parseQueryString(params.search).page || 1
  let query = parseQueryString(params.search).query || ''
  const [page, setPage] = React.useState(parseInt(pageNumber))
  const { find } = search.useActions()

  const switchPage = (page: number) => {
    setPage(page)
    history.push(`?page=${page}&query=${query}`)
  }

  React.useEffect(() => {
    //@ts-ignore
    find(query, page).catch((err: any) => {
      if (err.status === 422) switchPage(1)
    })
  }, [query, page])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    switchPage(value)
  }
  return (
    <>
      <div>
        По запросу <b>{query}</b> найдено {searchRes?.total_results} совпадений
      </div>
      {searchRes?.total_results ? (
        <>
          <CardsList>
            {searchRes.results?.map((el:any) => {
              switch (el.media_type) {
                case 'movie':
                  return <MovieCard  key={el.id} card={el} />
                case 'tv':
                  return <TVCard key={el.id} card={el} />
                default:
                  return <CardItem key={el.id}>N/A(Persona)</CardItem>
              }
            })}
          </CardsList>
          <Pagination
            className={classes.pagination}
            count={searchRes?.total_pages}
            page={page}
            color="primary"
            size="large"
            onChange={handleChange}
          />
        </>
      ) : null}
    </>
  )
}
