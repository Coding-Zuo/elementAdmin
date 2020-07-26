import Mock, { mock } from 'mockjs';

let api = 'http://localhost/';
Mock.mock(RegExp(api + 'zyxxpz/insertZYPZXX' + '.*'), {
    code: 2002,
    msg: '类似资源不存在',
    data: null
});
Mock.mock(RegExp(api + 'zyxxpz/queryPzzt' + '.*'), {
    code: 2003,
    msg: '资源配置信息存在',
    data: [
        {
            id: 1, //主键
            yxxmc: 'JB7', //元信息名称
            ysxmgf: 'ysxmgf', //元素项目隔符
            ysxwzxh: 1, //ysxwzxh
            ysmc: '产品类型', //元素名称
            sjkb: 'sjqxkz_sjmrsx', //数据库表
            sjkzd: 'producttype', //数据库字段
            zdlx: 'varchar(50)', //字段类型
            zddyz: null //字段对应值
        }
    ]
});
Mock.mock(RegExp(api + 'wzyhqxgl/getDataOpPrivilege' + '.*'), {
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
Mock.mock(RegExp(api + 'wzyhqxgl/insertSearchLevel' + '.*'), 'post', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/deleteSearchLevel' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/updateSearchLevel' + '.*'), {
    code: '1',
    data: '',
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
Mock.mock(RegExp(api + 'user1' + '.*'), {
    name: '战三', // 随机生成姓名
    'age|1-10': 5
});
Mock.mock(RegExp(api + 'wzyhqxgl/insertShareLevel' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/deleteShareLevel' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/queryUserInfo' + '.*'), 'get', {
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
Mock.mock(RegExp(api + 'wzyhqxgl/saveUserRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/updateShareLevel'), {
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
Mock.mock(RegExp(api + 'glyqxgl/saveBusinessProperty' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/LSaceeeehlqrruvy' + '.*'), {
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
Mock.mock(RegExp(api + 'wzyhqxgl/deletePurchaseType' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/updatePurchaseType' + '.*'), {
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
Mock.mock(RegExp(api + 'glyqxgl/updateDataSet' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/updateUserRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'glyqxgl/updateRole'), {
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
//查询业务属性   OrderLoadAuthRank.vue
Mock.mock(RegExp(api + 'wzyhqxgl/queryPurchaseType' + '.*'), {
    code: '1',
    data: {
        Total: 2,
        rows: ['业务属性7', '商业2']
    },
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
Mock.mock(RegExp(api + 'wzyhqxgl/insertRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/deleteRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/saveFuncPrivilege' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/queryUserPrivilege' + '.*'), {
    code: '1',
    data: [
        {
            roleName: '高级会员',
            searchList: ['WX-1'],
            downloadList: ['WX-2'],
            deleteList: ['WX-5'],
            funcPrivilegeNamelist: ['查询功能1']
        }
    ],
    msg: 'OK',
    status: true
});
Mock.mock(RegExp(api + 'wzyhqxgl/updateUserRole' + '.*'), {
    code: '1',
    data: [
        {
            satelliteName: 'WX-1',
            level: '开放等级5 '
        }
    ],
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
Mock.mock(RegExp(api + 'wzyhqxgl/saveDataOpPrivilege' + '.*'), {
    code: '1',
    data: '',
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
Mock.mock(RegExp(api + 'sjgl/sjsmzqgl/queryLifecycleStrategyInfo' + '.*'), {
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
        }
    ],
    msg: 'OK'
});
Mock.mock(RegExp(api + 'sjgl/sjsmzqgl/UpdateStrategyUseStatus' + '.*'), {
    status: 'False', //成功时为True，失败时为false
    code: '0', //1表示成功，0表示失败
    msg: '已经存在启用策略，数据集合为：casEarth卫星名称为：卫星1产品类型为：产品一号2 产品类型3' //返回无法更新原因
});
Mock.mock(RegExp(api + 'sjgl/sjwhgl/dataDelete' + '.*'), {
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
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    pageIndex: '1', //页码索引
    pageSize: '10', //每页显示条数
    data: [
        {
            sjid: '3',
            sjlx: '非临时区策略',
            wxdh: 'casEarth卫星',
            cgqdh: '123',
            sjywsx: '业务属性',
            sjgxjb: '用户级',
            fbl: '30米',
            迁移目的存储区: '存储区1',
            数据区域: '数据区域'
        },
        {
            sjid: '3',
            sjlx: '非临时区策略',
            wxdh: 'casEarth卫星',
            cgqdh: '123',
            sjywsx: '业务属性',
            sjgxjb: '用户级',
            fbl: '30米',
            迁移目的存储区: '存储区1',
            数据区域: '数据区域'
        },
        {
            sjid: '3',
            sjlx: '非临时区策略',
            wxdh: 'casEarth卫星',
            cgqdh: '123',
            sjywsx: '业务属性',
            sjgxjb: '用户级',
            fbl: '30米',
            迁移目的存储区: '存储区1',
            数据区域: '数据区域'
        },
        {
            sjid: '3',
            sjlx: '非临时区策略',
            wxdh: 'casEarth卫星',
            cgqdh: '123',
            sjywsx: '业务属性',
            sjgxjb: '用户级',
            fbl: '30米',
            迁移目的存储区: '存储区1',
            数据区域: '数据区域'
        }
    ],
    msg: 'OK'
});
Mock.mock(RegExp(api + 'sjgl/sjwhgl/dataMigrate' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp(api + 'sjgl/sjwhgl/dataDelete' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp(api + 'sjgl/sjwhgl/dataMigrate' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp(api + 'sjgl/sjqygl/updateMigrationStrategyInfo' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //失败时返回无法更新原因'该迁移策略信息正在被启用，无法更新!'
});
Mock.mock(RegExp(api + 'sjgl/sjqygl/deleteMigrationStrategyInfo' + '.*'), {
    status: '0', //1表示成功，0表示失败
    code: 'False', //成功时返回True
    msg: 'ID为1的策略信息正在被启用，无法删除 ！' //成功时为"OK"，失败时返回无法删除原"
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
Mock.mock(RegExp(api + 'sjgl/sjsmzqgl/queryLifecycleStrategyInfo' + '.*'), {
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
Mock.mock(RegExp(api + 'sjgl/sjsmzqgl/updateLifecycleStrategyInfo' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //失败时返回无法更新原因"该生命周期策略信息正在被启用，无法更新!"
});
Mock.mock(RegExp(api + 'sjgl/sjsmzqgl/deleteLifecycleStrategyInfo'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法删除原因
});
//数据归档
Mock.mock(RegExp(api + 'zygdfw/queryJobList' + '.*'), {
    code: 200,
    msg: '成功',
    data: { pageNo: 1, pageSize: 9, totalNum: 807, totalPage: 90, startIndex: 0, autoCount: true },
    pageNo: 1,
    pageSize: 9,
    totalNum: 807,
    totalPage: 90,
    startIndex: 0,
    autoCount: true,
    items: [
        {
            zxxh: 'HTZCJD3033',
            zylx: '民商数据资源_标准产品影像',
            rwzt: '已完成',
            wxbh: 'GF1',
            sjml: '数据目录',
            sjmc: '数据名称',
            sjdx: '数据大小',
            cjsj: '创建时间',
            wcsj: '完成时间',
            cljg: '处理结果'
        },
        {
            zxxh: 'HTZCJD3033',
            zylx: '民商数据资源_标准产品影像',
            rwzt: '已完成',
            wxbh: 'GF1',
            sjml: '数据目录',
            sjmc: '数据名称',
            sjdx: '数据大小',
            cjsj: '创建时间',
            wcsj: '完成时间',
            cljg: '处理结果'
        },
        {
            zxxh: 'HTZCJD3033',
            zylx: '民商数据资源_标准产品影像',
            rwzt: '已完成',
            wxbh: 'GF1',
            sjml: '数据目录',
            sjmc: '数据名称',
            sjdx: '数据大小',
            cjsj: '创建时间',
            wcsj: '完成时间',
            cljg: '处理结果'
        }
    ],
    zxxh: 'HTZCJD3033',
    zylx: '民商数据资源_标准产品影像',
    rwzt: '已完成',
    wxbh: 'GF1',
    sjml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf',
    sjmc: 'GF1_PMS1_E116.0_N38.9_20190712_L1A0004110997.tar.gz',
    yxj: '2',
    sjl: 453.977,
    cjsj: '2020-06-08 11:44:00',
    wcsj: '2020-06-08 11:45:33',
    cljg: '成功',
    sjbh: 'GF1_4110997_PMS1_LEVEL1A',
    rwlx: '新增',
    mmbs: 'GF1',
    1: { zxxh: 'HTZCJD3032', zylx: '民商数据资源_标准产品影像', rwzt: '已完成', wxbh: 'GF2' },
    2: { zxxh: 'HTZCJD3031', zylx: '民商数据资源_标准产品影像', rwzt: '已完成', wxbh: 'GF2' },
    3: { zxxh: 'HTZCJD3030', zylx: '民商数据资源_标准产品影像', rwzt: '已完成', wxbh: 'GF2' },
    4: { zxxh: 'HTZCJD3029', zylx: '民商数据资源_标准产品影像', rwzt: '已完成', wxbh: 'GF1' }
});
Mock.mock(RegExp(api + 'zyxxpz/selectZYPZXXByxh' + '.*'), {
    code: 200,
    msg: '成功',
    data: { xh: '40', yxxmc: '高分二号数据资源一级产品', mmbs: 'GF2', zylx: '民商数据资源_标准产品影像', sjkb: 'mssjzy_bzcpyxb' },
    xh: '40',
    yxxmc: '高分二号数据资源一级产品',
    mmbs: 'GF2',
    zylx: '民商数据资源_标准产品影像',
    sjkb: 'mssjzy_bzcpyxb',
    pzlx: 'xml',
    sjly: 'ZYZX',
    zyms: '高分二号数据资源一级产品',
    sfqy: null,
    gdzyjsmlList: [
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' },
        { xh: '529', yxxmc: '高分二号数据资源一级产品', jsml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf', sfqy: '1' }
    ]
});
Mock.mock(RegExp(api + 'zygdfw/queryJobLogList' + '.*'), {
    code: 200,
    msg: '成功',
    data: { pageNo: 1, pageSize: 100, totalNum: 6, totalPage: 1, startIndex: 0, autoCount: true },
    pageNo: 1,
    pageSize: 100,
    totalNum: 6,
    totalPage: 1,
    startIndex: 0,
    autoCount: true,
    items: [{ zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' }],
    0: { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' },
    zxxh: 'HTZCJD3033',
    zylx: null,
    sjmc: null,
    rznr: '开始进行归档入库处理',
    rksj: '2020-06-08 11:44:35',
    // TODO 此处的list字段是自己添加的，
    list: [
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '数据文件解压成功' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '元数据入库成功' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '数据归档成功' }
    ]
});
Mock.mock(RegExp(api + 'zyxxpz/queryZYPZXXList' + '.*'), {
    code: 200,
    msg: '成功',
    data: { pageNo: 1, pageSize: 11, totalNum: 13, totalPage: 2, startIndex: 0, autoCount: true },
    pageNo: 1,
    pageSize: 11,
    totalNum: 13,
    totalPage: 2,
    startIndex: 0,
    autoCount: true,
    items: [{ xh: '40', yxxmc: '高分二号数据资源一级产品', mmbs: 'GF2', zylx: '民商数据资源_标准产品影像', sjkb: 'mssjzy_bzcpyxb' }],
    xh: '40',
    yxxmc: '高分二号数据资源一级产品',
    mmbs: 'GF2',
    zylx: '民商数据资源_标准产品影像',
    sjkb: 'mssjzy_bzcpyxb',
    pzlx: 'xml',
    sjly: 'ZYZX',
    zyms: '高分二号数据资源一级产品',
    sfqy: null,
    gdzyjsmlList: null,
    list: [
        { xh: '48', yxxmc: '资源三号数据资源一级产品', mmbs: 'ZY3;L1', zylx: '民商数据资源_标准产品影像', sjkb: 'mssjzy_bzcpyxb' },
        { xh: '41', yxxmc: '吉林一号光学03星一级产 品', mmbs: 'JL101C;L1', zylx: '民商数据资源_标准产品影像', sjkb: 'mssjzy_bzcpyxb' },
        { xh: '42', yxxmc: '吉林一号视频07星一级产品', mmbs: 'JL107B;L1', zylx: '民商数据资源_标准产品影像', sjkb: 'mssjzy_bzcpyxb' }
    ]
});
Mock.mock(RegExp(api + 'zyxxpz/insertZYPZXX' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
Mock.mock(RegExp(api + 'zyxxpz/deleteZYPZXX' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
//门户网站管理
Mock.mock(RegExp(api + 'mh/saveWx' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
});
Mock.mock(RegExp(api + 'mh/delWx' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
}); //卫星编辑
Mock.mock(RegExp(api + 'mh/editWx' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp(api + 'mh/quertWxLi' + '.*'), {
    code: 200,
    result: {
        pageNo: 1,
        pageSize: 10,
        totalNum: 0,
        isMore: 0,
        totalPage: 0,
        startIndex: 0,
        autoCount: true,
        items: [
            {
                id: 1,
                title: '卫星1',
                who: '超级管理员',
                state: '成功',
                date: '2020-02-02'
            },
            {
                id: 1,
                title: '卫星1',
                who: '超级管理员',
                state: '成功',
                date: '2020-02-02'
            },
            {
                id: 1,
                title: '卫星1',
                who: '超级管理员',
                state: '成功',
                date: '2020-02-02'
            },
            {
                id: 1,
                title: '卫星1',
                who: '超级管理员',
                state: '成功',
                date: '2020-02-02'
            }
        ]
    },
    message: '操作成功！',
    queryId: 'fc1c72cf-a531-4121-9973-168fc61e332f'
});
Mock.mock(RegExp(api + 'mh/saveXw' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp(api + 'mh/delXw' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
}); //卫星查找
Mock.mock(RegExp(api + 'mh/quertWx' + '.*'), {
    code: 200,
    result: {
        xh: 1,
        bt: '标题',
        fbt: '副标题',
        tp: null,
        nr: '内容',
        fbr: '发布人',
        fbsj: 1595260800000,
        gxsj: 1595347200000
    },
    message: '操作成功！',
    queryId: 'a52567b0-35aa-4ff4-9f63-50b9b23f3f1b'
}); //新闻编辑
Mock.mock(RegExp(api + 'mh/editXw' + '.*'), {
    code: 200, //状态代号 200表示操作成功，500 服务器错误
    result: '操作成功', // 反馈信息
    message: '操作成功！',
    queryId: '5ea973c2-dc70-4dba-b8ab-2646779c2c7e'
});
Mock.mock(RegExp(api + 'mh/quertXwList' + '.*'), {
    code: 200,
    result: {
        pageNo: 1,
        pageSize: 10,
        totalNum: 1,
        isMore: 0,
        totalPage: 1,
        startIndex: 0,
        autoCount: true,
        items: [
            {
                xh: 1,
                bt: '标题',
                fbt: '副标题',
                tp: null,
                nr: '内容',
                fbr: '发布人',
                fbsj: 1595260800000,
                gxsj: 1595347200000
            }
        ]
    },
    message: '操作成功！',
    queryId: '12370fa4-913a-4530-b0d7-a30de67450d4'
});
//未调通
Mock.mock(RegExp(api + 'mh/saveYxzt' + '.*'), {
    code: 200,
    result: {
        pageNo: 1,
        pageSize: 10,
        totalNum: 1,
        isMore: 0,
        totalPage: 1,
        startIndex: 0,
        autoCount: true,
        items: [
            {
                xh: 1,
                bt: '标题',
                fbt: '副标题',
                tp: null,
                nr: '内容',
                fbr: '发布人',
                fbsj: 1595260800000,
                gxsj: 1595347200000
            }
        ]
    },
    message: '操作成功！',
    queryId: '12370fa4-913a-4530-b0d7-a30de67450d4'
});
Mock.mock(RegExp(api + 'mh/delYxzt' + '.*'), {
    code: 200, //状态代号 200表示操作成功，500 服务器错误
    result: '操作成功', // 反馈信息
    message: '操作成功！',
    queryId: '5ea973c2-dc70-4dba-b8ab-2646779c2c7e'
});
Mock.mock(RegExp(api + 'mh/quertYxzt' + '.*'), {
    code: 200,
    result: {
        yxzt: {
            id: 5,
            ztmc: '展厅名称',
            fbr: 'admin'
        },
        yxztTp: [
            {
                id: 4,
                ztid: 5,
                sjmc: '数据名称1',
                fbsj: 1594608966680,
                gxsj: 1594608966680,
                px: '1',
                tplj: 'http://localhost:8080/20200713/Hydrangeas.jpg',
                file: null
            },
            {
                id: 5,
                ztid: 5,
                sjmc: '数据名称2',
                fbsj: 1594608966694,
                gxsj: 1594608966694,
                px: '2',
                tplj: 'http://localhost:8080/20200713/Jellyfish.jpg',
                file: null
            },
            {
                id: 6,
                ztid: 5,
                sjmc: '数据名称3',
                fbsj: 1594608966703,
                gxsj: 1594608966703,
                px: '3',
                tplj: 'http://localhost:8080/20200713/Koala.jpg',
                file: null
            }
        ]
    },
    message: '操作成功！',
    queryId: '91eb4f35-152a-49ee-a444-59ee8fdc92f0'
});
Mock.mock(RegExp(api + 'mh/editYxzt' + '.*'), {
    code: 200,
    result: {
        pageNo: 1,
        pageSize: 10,
        totalNum: 1,
        isMore: 0,
        totalPage: 1,
        startIndex: 0,
        autoCount: true,
        items: [
            {
                xh: 1,
                bt: '标题',
                fbt: '副标题',
                tp: null,
                nr: '内容',
                fbr: '发布人',
                fbsj: 1595260800000,
                gxsj: 1595347200000
            }
        ]
    },
    message: '操作成功！',
    queryId: '12370fa4-913a-4530-b0d7-a30de67450d4'
});
Mock.mock(RegExp(api + 'mh/quertYxztList' + '.*'), {
    code: 200,
    result: {
        pageNo: 1,
        pageSize: 10,
        totalNum: 1,
        isMore: 0,
        totalPage: 1,
        startIndex: 0,
        autoCount: true,
        items: [
            {
                id: 5,
                ztmc: '展厅名称',
                fbr: 'admin'
            }
        ]
    },
    message: '操作成功！',
    queryId: 'b6c5bf1d-d8da-4dca-896c-57851e794d34'
});
//县城查询
Mock.mock(RegExp(api + 'xzq/quertProvince' + '.*'), {
    code: 200,
    result: [
        {
            xzqbm: '110000',
            xzqmc: '北京市',
            zxdjd: '116.39794710000000',
            zxdwd: '39.90817260000000',
            zxjd: '115.41651916500000',
            zxwd: '39.44246673600000',
            zdjd: '117.49919891400000',
            zdwd: '41.05860900900000',
            bjzbs: 304,
            bjzb: '',
            jb: '2',
            cxbjzb: '',
            fgeometry: ''
        },
        {
            xzqbm: '110000',
            xzqmc: '上海市',
            zxdjd: '116.39794710000000',
            zxdwd: '39.90817260000000',
            zxjd: '115.41651916500000',
            zxwd: '39.44246673600000',
            zdjd: '117.49919891400000',
            zdwd: '41.05860900900000',
            bjzbs: 304,
            bjzb: '',
            jb: '2',
            cxbjzb: '',
            fgeometry: ''
        },
        {
            xzqbm: '110000',
            xzqmc: '天津',
            zxdjd: '116.39794710000000',
            zxdwd: '39.90817260000000',
            zxjd: '115.41651916500000',
            zxwd: '39.44246673600000',
            zdjd: '117.49919891400000',
            zdwd: '41.05860900900000',
            bjzbs: 304,
            bjzb: '',
            jb: '2',
            cxbjzb: '',
            fgeometry: ''
        }
    ],
    message: '操作成功！',
    queryId: 'e29410a1-abb5-4ff9-9246-f285a977bff8'
});
Mock.mock(RegExp(api + 'xzq/quertCity' + '.*'), {
    code: 200,
    result: [
        {
            xzqbm: '110000',
            xzqmc: '北京市',
            zxdjd: '116.39794710000000',
            zxdwd: '39.90817260000000',
            zxjd: '115.41651916500000',
            zxwd: '39.44246673600000',
            zdjd: '117.49919891400000',
            zdwd: '41.05860900900000',
            bjzbs: 304,
            bjzb: '',
            jb: '2',
            cxbjzb: '',
            fgeometry: ''
        }
    ],
    message: '操作成功！',
    queryId: 'e29410a1-abb5-4ff9-9246-f285a977bff8'
});
Mock.mock(RegExp(api + 'xzq/quertCounty' + '.*'), {
    code: 200,
    result: [
        {
            xzqbm: '110000',
            xzqmc: '北京市',
            zxdjd: '116.39794710000000',
            zxdwd: '39.90817260000000',
            zxjd: '115.41651916500000',
            zxwd: '39.44246673600000',
            zdjd: '117.49919891400000',
            zdwd: '41.05860900900000',
            bjzbs: 304,
            bjzb: '',
            jb: '2',
            cxbjzb: '',
            fgeometry: ''
        }
    ],
    message: '操作成功！',
    queryId: 'e29410a1-abb5-4ff9-9246-f285a977bff8'
});
//轮播图
Mock.mock(RegExp(api + 'mh/saveLbt' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
});
Mock.mock(RegExp(api + 'mh/delLbt' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
});
Mock.mock(RegExp(api + 'mh/editLbt' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
});
Mock.mock(RegExp(api + 'mh/saveTzgg'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp(api + 'mh/editTzgg'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp(api + 'mh/delTzgg'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp(api + 'mh/quertTzggList' + '.*'), {
    code: 200,
    result: {
        pageNo: 1,
        pageSize: 10,
        totalNum: 1,
        isMore: 0,
        totalPage: 1,
        startIndex: 0,
        autoCount: true,
        items: [
            {
                xh: 1,
                bt: null,
                fbt: null,
                tp: null,
                nr: '88',
                fbr: 'http://www.baidu.com,1',
                fbsj: 1594656000000,
                gxsj: 1594656000000
            },
            {
                xh: 1,
                bt: null,
                fbt: null,
                tp: null,
                nr: '88',
                fbr: 'http://www.baidu.com,1',
                fbsj: 1594656000000,
                gxsj: 1594656000000
            },
            {
                xh: 1,
                bt: null,
                fbt: null,
                tp: null,
                nr: '88',
                fbr: 'http://www.baidu.com,1',
                fbsj: 1594656000000,
                gxsj: 1594656000000
            },
            {
                xh: 1,
                bt: null,
                fbt: null,
                tp: null,
                nr: '88',
                fbr: 'http://www.baidu.com,1',
                fbsj: 1594656000000,
                gxsj: 1594656000000
            },
            {
                xh: 1,
                bt: null,
                fbt: null,
                tp: null,
                nr: '88',
                fbr: 'http://www.baidu.com,1',
                fbsj: 1594656000000,
                gxsj: 1594656000000
            },
            {
                xh: 1,
                bt: null,
                fbt: null,
                tp: null,
                nr: '88',
                fbr: 'http://www.baidu.com,1',
                fbsj: 1594656000000,
                gxsj: 1594656000000
            }
        ],
        message: '操作成功！',
        queryId: 'e47ecc19-9396-4902-9f3f-21ef26d3584f'
    }
});
Mock.mock(RegExp(api + 'mh/quertTzgg' + '.*'), {
    code: 200,
    result: {
        xh: 1,
        bt: null,
        fbt: null,
        tp:
            '/9j/4AAQSkZdwSx9L/VbgkCWYvylaOaGvof5f7PXFojdgyEOrGxbWAwBsusNpJAYGxJ+t+D9femgSNWQjUpbFDniR604Dy9aUpUdOKwFCCBX7MDjjj5H5+Xp1wYMYyrKAeUsbyKw1lm5N/XYj0m97/wCPvchdIxEYgjlqg92aD5kgAcPUn',
        nr: '88',
        fbr: 'http://www.baidu.com,1',
        fbsj: 1594656000000,
        gxsj: 1594656000000
    },
    message: '操作成功！',
    queryId: 'e47ecc19-9396-4902-9f3f-21ef26d3584f'
});
Mock.mock(RegExp(api + 'zyxxpz/insertXMLPzxx' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});

//接口尚未使用
Mock.mock(RegExp(api + 'zyxxpz/editXmlPzxx' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
Mock.mock(RegExp(api + 'zyxxpz/editWJJPzxx' + '.*'), [
    {
        code: 200,
        msg: '成功',
        data: null
    }
]);
Mock.mock(RegExp(api + 'zyxxpz/insertSMWJLJ' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
Mock.mock(RegExp(api + 'zyxxpz/updateSMWJLJ' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
Mock.mock(RegExp(api + 'zyxxpz/deleteSMWJLJ' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
export default {
    api
};
