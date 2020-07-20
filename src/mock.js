import Mock from 'mockjs';
// Mock.mock(RegExp(api + 'glyqxgl/queryDataSet' + '.*'), {
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
Mock.mock(api + 'wzyhqxgl/querySearchLevel', {
    code: '1',
    data: {
        Total: 1,
        rows: ['开放等级4']
    },
    msg: 'OK',
    status: true
});
Mock.mock(api + '/wzyhqxgl/insertSearchLevel', 'post', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(api + 'wzyhqxgl/deleteSearchLevel', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/updateSearchLevel'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(api + 'wzyhqxgl/queryShareLevel', {
    code: '1',
    data: {
        Total: 1,
        rows: ['一般共享']
    },
    msg: 'OK',
    status: true
});
Mock.mock('http://localhost/user1', {
    name: '战三', // 随机生成姓名
    'age|1-10': 5
});
Mock.mock(api + 'wzyhqxgl/insertShareLevel', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(api + 'wzyhqxgl/deleteShareLevel', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/queryUserInfo'), 'get', {
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
Mock.mock(api + 'wzyhqxgl/updateShareLevel', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/queryBusinessProperty' + '.*'), {
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
            },
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
            },
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
            },
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
});
Mock.mock(api + '/glyqxgl/saveBusinessProperty', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(api + '/wzyhqxgl/LSaceeeehlqrruvy', {
    code: '1',
    data: {
        Total: 1,
        rows: ['开放等级4']
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/insertPurchaseType' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(api + 'wzyhqxgl/deletePurchaseType', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(api + 'wzyhqxgl/updatePurchaseType', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/queryDataSet' + '.*'), {
    code: '1',
    data: {
        Total: 1,
        rows: [
            {
                id: 10,
                dataSetName: '数据集合2',
                satelliteName: 'WX-1',
                productType: '产品一号1 产品类型2',
                lastModifiedTime: 1593339504500
            },
            {
                id: 10,
                dataSetName: '数据集合2',
                satelliteName: 'WX-1',
                productType: '产品一号1 产品类型2',
                lastModifiedTime: 1593339504500
            },
            {
                id: 10,
                dataSetName: '数据集合2',
                satelliteName: 'WX-1',
                productType: '产品一号1 产品类型2',
                lastModifiedTime: 1593339504500
            },
            {
                id: 10,
                dataSetName: '数据集合2',
                satelliteName: 'WX-1',
                productType: '产品一号1 产品类型2',
                lastModifiedTime: 1593339504500
            },
            {
                id: 10,
                dataSetName: '数据集合2',
                satelliteName: 'WX-1',
                productType: '产品一号1 产品类型2',
                lastModifiedTime: 1593339504500
            }
        ]
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/deleteDataSet' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/querySatelliteName' + '.*'), {
    code: '1',
    data: ['WX-2', 'WX-1', 'WX-3'],
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/insertDataSet' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/queryProductType' + '.*'), {
    code: '1',
    data: ['产品二号', '产品一号', '产品一号'],
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/queryShareLevel' + '.*'), {
    code: '1',
    data: {
        Total: 1,
        rows: ['一般共享']
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/queryShareLevel' + '.*'), {
    code: '1',
    data: {
        Total: 1,
        rows: ['一般共享']
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/querySearchLevel' + '.*'), {
    code: '1',
    data: {
        Total: 1,
        rows: [
            {
                id: 3,
                roleId: 10002,
                roleName: '管理员11',
                roleDescription: '123132',
                lastModifiedTime: 1593796015400
            }
        ]
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/updateDataSet' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/querySatelliteNameByUserId' + '.*'), {
    code: '1',
    data: ['WX-1', 'WX-2'],
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/saveAdminDataRange' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/querySearchLevel' + '.*'), {
    code: '1',
    data: {
        Total: 1,
        rows: [
            {
                id: 3,
                roleId: 10002,
                roleName: '管理员11',
                roleDescription: '123132',
                lastModifiedTime: 1593796015400
            },
            {
                id: 3,
                roleId: 10002,
                roleName: '管理员11',
                roleDescription: '123132',
                lastModifiedTime: 1593796015400
            },
            {
                id: 3,
                roleId: 10002,
                roleName: '管理员11',
                roleDescription: '123132',
                lastModifiedTime: 1593796015400
            },
            {
                id: 3,
                roleId: 10002,
                roleName: '管理员11',
                roleDescription: '123132',
                lastModifiedTime: 1593796015400
            },
            {
                id: 3,
                roleId: 10002,
                roleName: '管理员11',
                roleDescription: '123132',
                lastModifiedTime: 1593796015400
            },
            {
                id: 3,
                roleId: 10002,
                roleName: '管理员11',
                roleDescription: '123132',
                lastModifiedTime: 1593796015400
            },
            {
                id: 3,
                roleId: 10002,
                roleName: '管理员11',
                roleDescription: '123132',
                lastModifiedTime: 1593796015400
            }
        ]
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/insertRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/deleteRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/queryDataOpPrivilege' + '.*'), {
    code: '1',
    data: {
        id: 2,
        roleId: 10001,
        searchSatelliteRange: 'WX-5 WX-2',
        relocateSatelliteRange: 'WX-2 WX-3',
        deleteSatelliteRange: 'WX-3 WX-2',
        lastModifiedTime: 1593462484900
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/saveBusinessProperty' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/DOPaaaeeegiilprstvv' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/queryFuncPrivilege' + '.*'), {
    code: '1',
    data: [
        {
            id: 1,
            roleId: 10001,
            functionPrivilegeId: 10002,
            functionPrivilegeName: '管理员查询功能2',
            lastModifiedTime: 1593462683400
        }
    ],
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/saveDataOpPrivilege' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/queryAdminInfo' + '.*'), {
    code: '1',
    data: {
        Total: 1,
        rows: [
            {
                id: 2,
                userId: 200001,
                roleName: '管理员1 管理员2',
                password: '778989',
                registerTime: 1592972810000,
                enabled: false,
                userName: '管理员2',
                organizationName: '中央',
                organizationType: '权力机关',
                address: '海淀区',
                zipcode: '222222',
                phoneNumber: 18254678945,
                email: '77542552@qq.com',
                lastModifiedTime: 1592972809800
            },
            {
                id: 2,
                userId: 200001,
                roleName: '管理员1 管理员2',
                password: '778989',
                registerTime: 1592972810000,
                enabled: false,
                userName: '管理员2',
                organizationName: '中央',
                organizationType: '权力机关',
                address: '海淀区',
                zipcode: '222222',
                phoneNumber: 18254678945,
                email: '77542552@qq.com',
                lastModifiedTime: 1592972809800
            },
            {
                id: 2,
                userId: 200001,
                roleName: '管理员1 管理员2',
                password: '778989',
                registerTime: 1592972810000,
                enabled: false,
                userName: '管理员2',
                organizationName: '中央',
                organizationType: '权力机关',
                address: '海淀区',
                zipcode: '222222',
                phoneNumber: 18254678945,
                email: '77542552@qq.com',
                lastModifiedTime: 1592972809800
            },
            {
                id: 2,
                userId: 200001,
                roleName: '管理员1 管理员2',
                password: '778989',
                registerTime: 1592972810000,
                enabled: false,
                userName: '管理员2',
                organizationName: '中央',
                organizationType: '权力机关',
                address: '海淀区',
                zipcode: '222222',
                phoneNumber: 18254678945,
                email: '77542552@qq.com',
                lastModifiedTime: 1592972809800
            }
        ]
    },
    msg: 'OK',
    status: true
});
//该接口尚未调用==>角色管理，超级管理管理员界面
Mock.mock(RegExp(api + 'glyqxgl/saveFuncPrivilege' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/saveAdminRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/queryAdminPrivilege' + '.*'), {
    code: '1',
    data: [
        {
            roleName: '管理员5',
            searchList: ['WX-5'],
            downloadList: ['WX-2'],
            deleteList: ['WX-3'],
            funcPrivilegeNamelist: ['管理员查询功能2']
        }
    ],
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/updateRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/queryDataOpPrivilege' + '.*'), {
    code: '1',
    data: {
        id: 1,
        roleId: 10001,
        searchLevel: '6 4',
        searchSatelliteRange: 'WX-3 WX-1',
        downloadLevel: '2 3',
        downloadSatelliteRange: 'WX-3 WX-2',
        purchaseType: '1 2',
        purchaseTypeSatelliteRange: 'WX-3 WX-4',
        lastModifiedTime: 1593459674200
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/queryRole' + '.*'), {
    code: '1',
    data: {
        Total: 1,
        rows: [
            {
                id: 3,
                roleId: 10002,
                roleName: '高级会员',
                roleDescription: '8888',
                lastModifiedTime: 1594054871000
            }
        ]
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'sjgl/sjccqgl/addStoreInfo' + '.*'), {
    status: 'True', //成功时返回True失败时为False,
    code: 1, //1表示成功，0表示失败,
    msg: 'OK' //失败时返回错误原因"该存储区信息已经存在",
});
Mock.mock(RegExp(api + 'sjgl/sjccqgl/queryStoreInf' + '.*'), {
    status: 'True',
    code: '1',
    data: {
        pageIndex: '1',
        pageSize: '5',
        ccqid: '1',
        ccqmc: '存储区2',
        ccqip: '123.45.678',
        yhm: '张三',
        yhmm: '123456',
        ccqgml: '/disk1',
        ccsbwz: '',
        ccsbssbm: '',
        ccsbglz: ':四',
        glzlxfs: '85642349',
        存储访问接口方式: '',
        xgsj: '2020 - 07 - 13',
        rksj: '2020 - 07 - 13',
        bz: '无'
    },

    msg: 'OK'
});
Mock.mock(RegExp(api + 'sjgl/sjccqgl/updateStoreInfo' + '.*'), {
    status: 'True', //成功时返回True，失败时为False
    code: '1', //1表示成功，0表示失败
    msg: 'OK' //失败时返回错误原因"该迁移策略信息正在被启用，无法更新!"
});
Mock.mock(RegExp(api + 'sjgl/sjccqgl/deleteStoreInfo' + '.*'), {
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    msg: 'OK'
});
Mock.mock(RegExp(api + 'sjgl/sjhsz/queryRecycleData' + '.*'), {
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    pageIndex: '1', //页码索引
    pageSize: '10', //每页显示条数
    data: {
        sjlx: '非临时区策略',
        ccq: '存储区1',
        sjcjkssj: '2020-07-13',
        sjcjjssj: '2020-07-14'
    },
    msg: 'OK'
});
Mock.mock(RegExp(api + 'sjgl/sjhsz/queryRecycleDataDetails' + '.*'), {
    status: 'True', //成功时返回True,
    code: '1', //1表示成功，0表示失败,
    pageIndex: '1', //页码索引,
    pageSize: '10', //每页显示条数,
    data: {
        sjid: '3',
        sjlx: '非临时区策略',
        ccq: '存储区1',
        sjcjsj: '2020-07-13', //数据创建时间,
        sjqlsj: '2020-07-14' //数据清理时间,
    },
    msg: 'OK'
});
Mock.mock(RegExp(api + 'sjgl/sjhsz/deleteRecycleData'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法删除原因
});
Mock.mock(RegExp(api + 'sjgl/sjhsz/recoveryRecycleData' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp(api + 'sjgl/sjwhgl/dataMigrate' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp(api + '/sjgl/sjwhgl/dataDelete' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp(api + 'sjgl/sjqygl/addMigrationStrategyInfo' + '.*'), {
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    msg: 'OK' //失败时返回错误原因"该迁移策略信息已经存在!"
});
Mock.mock(RegExp(api + 'sjgl/sjqygl/queryMigrationStrategyInfo' + '.*'), {
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    pageIndex: '1', //页码索引
    pageSize: '10', //每页显示条数
    data: [
        {
            qyclid: '1',
            clmc: '策略1',
            qysjjh: 'casEarth卫星',
            qysjjg: '3',
            qysjlx: '月',
            sjdqccqid: '123.45',
            sjqyccqid: '456.78',
            sjdqccqsyyzbfb: '75', //可为空
            Ccqsycyzhqysjfwzgjb: '超级管理员', //可为空
            clzxkssj: '2020-10-01',
            clzxzq: '2周',
            clyyzt: '启用', //停用
            gxsj: '2020-07-13',
            rksj: '2020-07-13',
            bz: '无' //可为空
        },
        {
            qyclid: '1',
            clmc: '策略1',
            qysjjh: 'casEarth卫星',
            qysjjg: '3',
            qysjlx: '月',
            sjdqccqid: '123.45',
            sjqyccqid: '456.78',
            sjdqccqsyyzbfb: '75', //可为空
            Ccqsycyzhqysjfwzgjb: '超级管理员', //可为空
            clzxkssj: '2020-10-01',
            clzxzq: '2周',
            clyyzt: '启用', //停用
            gxsj: '2020-07-13',
            rksj: '2020-07-13',
            bz: '无' //可为空
        }
    ],

    msg: 'OK'
});
Mock.mock(RegExp(api + 'sjgl/sjwhgl/queryData' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为'OK'，失败时返回无法恢复原因
});
Mock.mock(RegExp(api + 'sjgl/sjqygl/ updateMigrationStrategyInfo' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //失败时返回无法更新原因'该迁移策略信息正在被启用，无法更新!'
});
Mock.mock(RegExp(api + 'sjgl/sjqygl/UpdateStrategyUseStatus' + '.*'), {
    status: 'True', //失败时为false
    code: '0', //1表示成功，0表示失败
    msg: '已经存在启用策略，数据集合为：casEarth卫星名称为：卫星1产品类型为：产品一号1 产品类型2' //返回无法更新原因
});
Mock.mock(RegExp(api + 'sjgl/sjsmzqgl/addLifecycleStrategyInfo' + '.*'), {
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    msg: 'OK' //失败时返回错误原因"该生命周期策略信息已经存在!"
});
Mock.mock(RegExp(api + 'sjgl/sjsmzqgl/ queryLifecycleStrategyInfo' + '.*'), {
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    pageIndex: '1', //页码索引
    pageSize: '10', //每页显示条数
    data: [
        {
            smzqclid: '1',
            clmc: '策略2',
            cllx: '非临时区策略',
            sjjh: 'casEarth卫星',
            qlsjjg: '4',
            qlsjlx: '周',
            sjccqid: '123.45.678',
            sjsmzqclzxqttj: '无', //可为空
            clzxsj: '2020-07-15', //可为空
            clzxzq: '5天', //可为空
            clyyzt: '启用', //停用
            gxsj: '2020-07-13',
            rksj: '2020-07-13',
            bz: '无' //可为空
        },
        {
            smzqclid: '1',
            clmc: '策略2',
            cllx: '非临时区策略',
            sjjh: 'casEarth卫星',
            qlsjjg: '4',
            qlsjlx: '周',
            sjccqid: '123.45.678',
            sjsmzqclzxqttj: '无', //可为空
            clzxsj: '2020-07-15', //可为空
            clzxzq: '5天', //可为空
            clyyzt: '启用', //停用
            gxsj: '2020-07-13',
            rksj: '2020-07-13',
            bz: '无' //可为空
        },
        {
            smzqclid: '1',
            clmc: '策略2',
            cllx: '非临时区策略',
            sjjh: 'casEarth卫星',
            qlsjjg: '4',
            qlsjlx: '周',
            sjccqid: '123.45.678',
            sjsmzqclzxqttj: '无', //可为空
            clzxsj: '2020-07-15', //可为空
            clzxzq: '5天', //可为空
            clyyzt: '启用', //停用
            gxsj: '2020-07-13',
            rksj: '2020-07-13',
            bz: '无' //可为空
        },
        {
            smzqclid: '1',
            clmc: '策略2',
            cllx: '非临时区策略',
            sjjh: 'casEarth卫星',
            qlsjjg: '4',
            qlsjlx: '周',
            sjccqid: '123.45.678',
            sjsmzqclzxqttj: '无', //可为空
            clzxsj: '2020-07-15', //可为空
            clzxzq: '5天', //可为空
            clyyzt: '启用', //停用
            gxsj: '2020-07-13',
            rksj: '2020-07-13',
            bz: '无' //可为空
        }
    ],
    msg: 'OK'
});
Mock.mock(RegExp(api + '/sjgl/sjsmzqgl/ updateLifecycleStrategyInfo' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //失败时返回无法更新原因"该生命周期策略信息正在被启用，无法更新!"
});
Mock.mock(RegExp(api + 'sjgl/sjsmzqgl/ deleteLifecycleStrategyInfo'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法删除原因
});
export default {
    api
};
