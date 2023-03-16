import request from "@/utils/request";

const getHomeData = () => {
  return request.get('/home/getData')
}
const getUserData = () => {
  return request.get('/user/getUser')
}
const login = (option) => {
  return request.post('/login', option)
}
const getMenu = () => {
  return request.get('/getMenu')
}

export {
  getHomeData,
  getUserData,
  login,
  getMenu
}