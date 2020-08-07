import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { Box, Card } from '@material-ui/core'
import { movies } from '@src/store/modules/movies'
import { tv } from '@src/store/modules/tv'
import { CardsList } from '@src/components/CardsList'
import { MovieCard } from '@src/components/CardsList/MovieCard'
import { Link } from 'react-router-dom'
import { TVCard } from '@src/components/CardsList/TVCard'
import { CardSlider } from '@src/components/CardSlider'

export const Profile: React.FC = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  const moviesWL = movies.useWatchList()
  const moviesFL = movies.useFavoriteList()
  const moviesAct = movies.useActions()

  const tvWL = tv.useWatchList()
  const tvFL = tv.useFavoriteList()
  const tvAct = tv.useActions()
  React.useEffect(() => {
    moviesAct.getWatchList(1)
    moviesAct.getFavoriteList(1)
    tvAct.getWatchList(1)
    tvAct.getFavoriteList(1)
  }, [])
  return (
    <div>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Movies" />
          <Tab label="TV" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        {!moviesWL.isLoading ? (
          <>
            {moviesWL.data.total_results > 0 && (
              <>
                <Typography variant="button" component="h6">
                  Watchlist{' '}
                  <Link to={'/profile/movies/watchlist'}>
                    посмотреть весь список
                  </Link>
                </Typography>
                <CardSlider>
                  {moviesWL.data?.results?.map((el) => (
                    <MovieCard
                      isLoading={moviesWL.isLoading}
                      key={el.id}
                      card={el}
                    />
                  ))}
                </CardSlider>
              </>
            )}
          </>
        ) : null}
        {!moviesFL.isLoading ? (
          <>
            {moviesFL.data.total_results > 0 && (
              <>
                <Typography variant="button" component="h6">
                  FavoriteList{' '}
                  <Link to={'/profile/movies/favoritelist'}>
                    посмотреть весь список
                  </Link>
                </Typography>
                <CardSlider>
                  {moviesFL.data?.results?.map((el) => (
                    <MovieCard
                      isLoading={moviesFL.isLoading}
                      key={el.id}
                      card={el}
                    />
                  ))}
                </CardSlider>
              </>
            )}
          </>
        ) : null}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!tvWL.isLoading ? (
          <>
            {tvWL.data.total_results > 0 && (
              <>
                <Typography variant="button" component="h6">
                  WatchList{' '}
                  <Link to={'/profile/tv/watchlist'}>
                    посмотреть весь список
                  </Link>
                </Typography>
                <CardSlider>
                  {tvWL.data?.results?.map((el) => (
                    <TVCard isLoading={tvWL.isLoading} key={el.id} card={el} />
                  ))}
                </CardSlider>
              </>
            )}
          </>
        ) : null}
        {!tvFL.isLoading ? (
          <>
            {tvFL.data.total_results > 0 && (
              <>
                <Typography variant="button" component="h6">
                  FavoriteList{' '}
                  <Link to={'/profile/tv/favoritelist'}>
                    посмотреть весь список
                  </Link>
                </Typography>
                <CardSlider>
                  {tvFL.data?.results?.map((el) => (
                    <TVCard isLoading={tvFL.isLoading} key={el.id} card={el} />
                  ))}
                </CardSlider>
              </>
            )}
          </>
        ) : null}
      </TabPanel>
    </div>
  )
}
type TabPanelProps = {
  children?: React.ReactNode
  index: any
  value: any
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}
