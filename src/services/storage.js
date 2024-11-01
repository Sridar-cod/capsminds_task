export const storeUserData = (token) => {
  localStorage.setItem('idToken',token)
}
export const getUserData = () => {
 return localStorage.getItem('idToken')
}
export const removedUserData = () => {
  return localStorage.removeItem('idToken')
 }