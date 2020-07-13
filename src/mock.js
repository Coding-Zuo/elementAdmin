import Mock from 'mockjs';

Mock.mock('http://localhost/wzyhqxgl/getDataOpPrivilege', {
        "code": "1" ,
        "data": {
            "ywsxs": [
                {
                    "id": 1 ,
                    "purchaseType": "商业1" ,
                    "lastModifiedTime": 1593335275400
                } ,
                {
                    "id": 3 ,
                    "purchaseType": "商业2" ,
                    "lastModifiedTime": 1594054516500
                }
            ] ,
            "kfdjs": [
                {
                    "id": 6 ,
                    "searchLevel": "内部开放" ,
                    "lastModifiedTime": 1593334200400
                } ,
                {
                    "id": 10 ,
                    "searchLevel": "专项开放" ,
                    "lastModifiedTime": 1594052284900
                } ,
                {
                    "id": 7 ,
                    "searchLevel": "一般开放" ,
                    "lastModifiedTime": 1594053512500
                }
            ] ,
            "gxjbs": [
                {
                    "id": 2 ,
                    "downloadLevel": "共享级别1" ,
                    "lastModifiedTime": 1593334509600
                } ,
                {
                    "id": 3 ,
                    "downloadLevel": "一般共享" ,
                    "lastModifiedTime": 1594054045000
                } ,
                {
                    "id": 4 ,
                    "downloadLevel": "一般共享3" ,
                    "lastModifiedTime": 1594054160500
                }
            ]
        } ,
        "msg": "OK" ,
        "status": true
    }
);
Mock.mock('http://localhost/user1', {
    'name': '战三', // 随机生成姓名
    'age|1-10': 5
});