import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { CardsList } from '@src/components/CardsList'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { parseQueryString } from '@src/lib/parse_query_string'
import { TVCard } from '@src/components/CardsList/TVCard'
import {
  TPopularTV,
  TOnTheAirTV,
  TAiringTodayTV,
  TTopRatedTV,
  TRecommendations,
  TSimilarTV,
} from '@src/store/modules/tv/types'
import { TResponseError } from '@src/api/types'
import { useTranslation } from 'react-i18next'
const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
})
type T = {
  content: {
    data:
      | TPopularTV
      | TSimilarTV
      | TOnTheAirTV
      | TAiringTodayTV
      | TRecommendations
      | TTopRatedTV
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
  const tvID = parseInt(matchedParams.id || '0')
  const [t, i18n] = useTranslation()
  React.useEffect(() => {
    if (!withURLParam) getter(page)
    else getter(tvID, page)
  }, [page, getter, tvID, i18n.language])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    switchPage(value)
  }
  return (
    <>
      <CardsList>
        {content.data?.results?.map((el) => (
          <TVCard isLoading={content.isLoading} key={el.id} card={el} />
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
