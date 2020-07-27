export { authApi } from './auth'
export { accountApi } from './account'
export { moviesApi } from './movies'
export { searchApi } from './search'
//@ts-ignore
export const getImageLink = (path, size = 'w500') =>
  `https://image.tmdb.org/t/p/${size}/${path}`
