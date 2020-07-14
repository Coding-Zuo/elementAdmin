import Mock from 'mockjs';
let api = 'http://localhost/';
Mock.mock('http://localhost/wzyhqxgl/getDataOpPrivilege', {
    code: '1',
    data: {
        ywsxs: [
            {
                id: 1,
                purchaseType: '商业1',
                lastModifiedTime: 1593335275400
            },
            {
                id: 3,
                purchaseType: '商业2',
                lastModifiedTime: 1594054516500
            }
        ],
        kfdjs: [
            {
                id: 6,
                searchLevel: '内部开放',
                lastModifiedTime: 1593334200400
            },
            {
                id: 10,
                searchLevel: '专项开放',
                lastModifiedTime: 1594052284900
            },
            {
                id: 7,
                searchLevel: '一般开放',
                lastModifiedTime: 1594053512500
            }
        ],
        gxjbs: [
            {
                id: 2,
                downloadLevel: '共享级别1',
                lastModifiedTime: 1593334509600
            },
            {
                id: 3,
                downloadLevel: '一般共享',
                lastModifiedTime: 1594054045000
            },
            {
                id: 4,
                downloadLevel: '一般共享3',
                lastModifiedTime: 1594054160500
            }
        ]
    },
    msg: 'OK',
    status: true
});
Mock.mock('http://localhost/user1', {
    name: '战三', // 随机生成姓名
    'age|1-10': 5
});
//用户角色配置
Mock.mock(api + 'wzyhqxgl/queryUserInfo', 'get', {
    code: '1',
    data: {
        Total: 1,
        rows: [
            {
                id: 1,
                userId: 10000,
                password: '123456',
                roleName: '二级会员1',
                rwgisterTime: null,
                enabled: true,
                userName: 'user1',
                organizationName: '国务院',
                organizationType: '权力机关',
                address: '朝阳区',
                zipcode: '051430',
                phoneNumber: 18135554555,
                shareDataPurpose: '共享研发',
                lastModifiedTime: 1592972041300
            },
            {
                id: 2,
                userId: 10000,
                password: '123456',
                roleName: '二级会员1',
                rwgisterTime: null,
                enabled: true,
                userName: 'user1',
                organizationName: '国务院',
                organizationType: '权力机关',
                address: '朝阳区',
                zipcode: '051430',
                phoneNumber: 18135554555,
                shareDataPurpose: '共享研发',
                lastModifiedTime: 1592972041300
            },
            {
                id: 3,
                userId: 10000,
                password: '123456',
                roleName: '二级会员1',
                rwgisterTime: null,
                enabled: true,
                userName: 'user1',
                organizationName: '国务院',
                organizationType: '权力机关',
                address: '朝阳区',
                zipcode: '051430',
                phoneNumber: 18135554555,
                shareDataPurpose: '共享研发',
                lastModifiedTime: 1592972041300
            },
            {
                id: 4,
                userId: 10000,
                password: '123456',
                roleName: '二级会员1',
                rwgisterTime: null,
                enabled: true,
                userName: 'user1',
                organizationName: '国务院',
                organizationType: '权力机关',
                address: '朝阳区',
                zipcode: '051430',
                phoneNumber: 18135554555,
                shareDataPurpose: '共享研发',
                lastModifiedTime: 1592972041300
            },
            {
                id: 5,
                userId: 10000,
                password: '123456',
                roleName: '二级会员1',
                rwgisterTime: null,
                enabled: true,
                userName: 'user1',
                organizationName: '国务院',
                organizationType: '权力机关',
                address: '朝阳区',
                zipcode: '051430',
                phoneNumber: 18135554555,
                shareDataPurpose: '共享研发',
                lastModifiedTime: 1592972041300
            }
        ]
    },
    msg: 'OK',
    status: true
});
Mock.mock(api + '/wzyhqxgl/saveUserRole', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
//数据默认业务属性管理
Mock.mock(api + '/glyqxgl/queryBusinessProperty', {
    code: '1',
    data: {
        Total: 1,
        rows: [
            {
                id: 2,
                satelliteName: 'WX-1',
                productType: '产品一号',
                searchLevel: '6',
                searchLevelName: '开放等级5',
                purchaseType: '1',
                purchaseTypeName: '业务属性7',
                downloadLevel: '2',
                downloadLevelName: '共享级别1',
                dataProviderName: null,
                dataProviderContactInfo: null,
                productIllustrationFileRoute: null,
                productQualityControlInfo: null,
                lastModifiedTime: 1593338594600
            }
        ]
    },
    msg: 'OK',
    status: true
}),
    Mock.mock(api + 'wzyhqxgl/querySearchLevel', {
        code: '1',
        data: {
            Total: 1,
            rows: ['开放等级4']
        },
        msg: 'OK',
        status: true
    });
Mock.mock(api + '/glyqxgl/saveBusinessProperty', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
}),
    Mock.mock(api + '/wzyhqxgl/LSaceeeehlqrruvy;', {
        code: '1',
        data: {
            Total: 1,
            rows: ['开放等级4']
        },
        msg: 'OK',
        status: true
    });
//
export default {
    api
};
