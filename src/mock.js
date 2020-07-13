import Mock from 'mockjs';

Mock.mock('http://localhost/user', {
    'name': '@name',
    'age|1-10': 5
});
Mock.mock('http://localhost/user1', {
    'name': '战三', // 随机生成姓名
    'age|1-10': 5
});