import Mock from "mockjs";

const userJsData = Mock.mock({
  "list|18-30": [
    {
      id: '@increment()',
      name: "@cname",
      age: "@integer(10, 60)",
      gender: "@pick(['男', '女'])",
      date: "@date('yyyy-MM-dd')",
      address: "@county(true)",
    },
  ],
}).list;

export default userJsData;