import Mock from 'mockjs'

const userData = Mock.mock({
  'data|7': [{
    'name|+1': ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    'value1|0-200': 1,
    'value2|200-800': 1,
  }]
}).data;




export { userData}
