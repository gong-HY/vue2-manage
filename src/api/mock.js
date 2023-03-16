import Mock from 'mockjs'
import { tableData, countData, binData } from './mockData/home'
import { userData } from './mockData/permission'
import userJsData from './mockData/user'

import { adminMenuData, userMenuData } from './mockData/menu'


Mock.mock('/api/home/getData', { tableData, countData, userData, binData })
Mock.mock('/api/user/getUser', userJsData)

// 模拟生成不同的 token
const tokens = {
  'admin': 'admin-token',
  'user': 'user-token'
}
// 模拟登录接口
Mock.mock('/api/login', 'post', (options) => {
  // 解析 POST 请求的参数
  const { username, password } = JSON.parse(options.body)

  // 判断用户名和密码是否正确
  if (username === 'admin' && password === '123456') {
    return {
      code: 20000,
      data: tokens['admin']
    }
  } else if (username === 'user' && password === '123456') {
    return {
      code: 20000,
      data: tokens['user']
    }
  } else {
    return {
      code: 50000,
      message: '用户名或密码错误'
    }
  }
})


// 模拟获取菜单接口
Mock.mock('/api/getMenu', 'get', () => {
  return {
    code: 20000,
    data: { adminMenuData, userMenuData }
  }
})