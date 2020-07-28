export const parseQueryString = (str) =>
  str
    .substring(1)
    .split('&')
    .reduce((acc, el) => {
      const [key, value] = el.split('=')
      return { ...acc, [key]: decodeURIComponent(value) }
    }, {})
