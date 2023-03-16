import Mock from 'mockjs'

const tableData = Mock.mock({
  'list|6': [{
    'name|+1': ['小米', '三星', '魅族', 'vivo', 'oppo', '苹果'],
    'todayBuy|100-200': 1,
    'monthBuy|300-500': 1,
    'totalBuy|800-1000': 1,
  }]
}).list

const countData = Mock.mock({
  'list|6': [{
    'name|+1': ["今日支付订单", "今日收藏订单", "今日未支付订单", "本月支付订单", "本月收藏订单", "本月未支付订单"],
    'value|1000-5000': 1,
    'icon|+1': ["success", "star-on", "s-goods", "success", "star-on", "s-goods"],
    'color|+1': ["#2ec7c9", "#ffb980", "skyblue", "#2ec7c9", "#ffb980", "skyblue"]
  }]
}).list;

const binData = Mock.mock({
  'data|6': [
    {
      'value|1-50': 1,
      'name|+1': ['三星', '小米', '魅族', '苹果', 'vivo', 'oppo']
    }
  ]
}).data;


export { tableData,countData,binData}
