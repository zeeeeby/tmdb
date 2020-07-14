export const createQueryString = function (obj: any) {
  let str: Array<string> = []
  for (let p in obj)
    if (obj.hasOwnProperty(p) && obj[p]) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  return str.join('&')
}
