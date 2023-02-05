
export  const user = localStorage.getItem('user')?
JSON.parse(localStorage.getItem('user')) : null

export const customToken = user && Object.prototype.hasOwnProperty.call(user,'result')
export const Token_Google_auth = user && ! Object.prototype.hasOwnProperty.call(user,'result')

// const auth = useSelector(state=>state.auth)
//const customUser = auth && auth?.result
//GoogleUser = auth && auth?.GoogleToken