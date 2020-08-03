import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from './_base/page'

export const Recommendations: React.FC = () => {
  const { getRecommendations } = movies.useActions()
  return (
    <Page
      content={movies.useRecommendations()}
      getter={getRecommendations}
      withURLParam
    />
  )
}
