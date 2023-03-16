// 模拟生成菜单数据
const adminMenuData = [
  {
    path: "/",
    name: "home",
    label: "首页",
    icon: "s-home",
    url: "Home/Home",
  },
  {
    path: "/mall",
    name: "mall",
    label: "商品管理",
    icon: "video-play",
    url: "MallManage/MallManage",
  },
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "UserManage/UserManage",
  },
  {
    label: "其他",
    icon: "location",
    children: [
      {
        path: "/other/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Other/PageOne",
      },
      {
        path: "/other/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Other/PageTwo",
      },
    ],
  },
]
const userMenuData = [
  {
    path: "/",
    name: "home",
    label: "首页",
    icon: "s-home",
    url: "Home/Home",
  },
  {
    path: "/mall",
    name: "mall",
    label: "商品管理",
    icon: "video-play",
    url: "MallManage/MallManage",
  },

]

export { adminMenuData, userMenuData }
