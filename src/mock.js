import Mock, { mock } from 'mockjs';
Mock.mock(RegExp('http://localhost:8080/zyxxpz/queryPzzt' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/getDataOpPrivilege' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/insertSearchLevel' + '.*'), 'post', {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/deleteSearchLevel' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/updateSearchLevel' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/queryShareLevel' + '.*'), {
    code: '1',
    data: {
        Total: 1,
        rows: ['一般共享']
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/user1' + '.*'), {
    name: '战三', // 随机生成姓名
    'age|1-10': 5
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/insertShareLevel' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/deleteShareLevel' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/queryUserInfo' + '.*'), 'get', {
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
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/saveUserRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/updateShareLevel'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/queryBusinessProperty' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/glyqxgl/saveBusinessProperty' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/LSaceeeehlqrruvy' + '.*'), {
    code: '1',
    data: {
        Total: 1,
        rows: ['开放等级4']
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/insertPurchaseType' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/deletePurchaseType' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/updatePurchaseType' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/queryDataSet' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/glyqxgl/deleteDataSet' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/querySatelliteName' + '.*'), {
    code: '1',
    data: ['WX-2', 'WX-1', 'WX-3'],
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/insertDataSet' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/queryProductType' + '.*'), {
    code: '1',
    data: ['产品二号', '产品一号', '产品一号'],
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/updateDataSet' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/updateUserRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/updateRole'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/querySatelliteNameByUserId' + '.*'), {
    code: '1',
    data: ['WX-1', 'WX-2'],
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/saveAdminDataRange' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/querySearchLevel' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/glyqxgl/insertRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/deleteRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/queryDataOpPrivilege' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/glyqxgl/DOPaaaeeegiilprstvv' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/queryFuncPrivilege' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/glyqxgl/saveDataOpPrivilege' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
//查询业务属性   OrderLoadAuthRank.vue
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/queryPurchaseType' + '.*'), {
    code: '1',
    data: {
        Total: 2,
        rows: ['业务属性7', '商业2']
    },
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/queryAdminInfo' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/glyqxgl/saveFuncPrivilege' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/saveAdminRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/glyqxgl/queryAdminPrivilege' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/updateRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/queryDataOpPrivilege' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/insertRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/deleteRole' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/saveFuncPrivilege' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/queryUserPrivilege' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/updateUserRole' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/queryRole' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/wzyhqxgl/saveDataOpPrivilege' + '.*'), {
    code: '1',
    data: '',
    msg: 'OK',
    status: true
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjccqgl/addStoreInfo' + '.*'), {
    status: 'True', //成功时返回True失败时为False,
    code: 1, //1表示成功，0表示失败,
    msg: 'OK' //失败时返回错误原因"该存储区信息已经存在",
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjccqgl/queryStoreInf' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/sjgl/sjccqgl/updateStoreInfo' + '.*'), {
    status: 'True', //成功时返回True，失败时为False
    code: '1', //1表示成功，0表示失败
    msg: 'OK' //失败时返回错误原因"该迁移策略信息正在被启用，无法更新!"
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjccqgl/deleteStoreInfo' + '.*'), {
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    msg: 'OK'
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjhsz/queryRecycleData' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/sjgl/sjhsz/queryRecycleDataDetails' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/sjgl/sjhsz/deleteRecycleData'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法删除原因
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjhsz/recoveryRecycleData' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjwhgl/dataMigrate' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjsmzqgl/queryLifecycleStrategyInfo' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/sjgl/sjsmzqgl/UpdateStrategyUseStatus' + '.*'), {
    status: 'False', //成功时为True，失败时为false
    code: '0', //1表示成功，0表示失败
    msg: '已经存在启用策略，数据集合为：casEarth卫星名称为：卫星1产品类型为：产品一号2 产品类型3' //返回无法更新原因
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjwhgl/dataDelete' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjqygl/addMigrationStrategyInfo' + '.*'), {
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    msg: 'OK' //失败时返回错误原因"该迁移策略信息已经存在!"
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjqygl/queryMigrationStrategyInfo' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/sjgl/sjwhgl/queryData' + '.*'), {
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    pageIndex: '1', //页码索引
    pageSize: '10', //每页显示条数
    data: [
        {
            sjid: '1',
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
            sjid: '2',
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
            sjid: '4',
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
Mock.mock(RegExp('http://localhost:8080/sjgl/sjwhgl/dataMigrate' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjwhgl/dataDelete' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjwhgl/dataMigrate' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法恢复原因
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjqygl/updateMigrationStrategyInfo' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //失败时返回无法更新原因'该迁移策略信息正在被启用，无法更新!'
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjqygl/deleteMigrationStrategyInfo' + '.*'), {
    status: '0', //1表示成功，0表示失败
    code: 'False', //成功时返回True
    msg: 'ID为1的策略信息正在被启用，无法删除 ！' //成功时为"OK"，失败时返回无法删除原"
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjqygl/UpdateStrategyUseStatus' + '.*'), {
    status: 'True', //失败时为false
    code: '0', //1表示成功，0表示失败
    msg: '已经存在启用策略，数据集合为：casEarth卫星名称为：卫星1产品类型为：产品一号1 产品类型2' //返回无法更新原因
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjsmzqgl/addLifecycleStrategyInfo' + '.*'), {
    status: 'True', //成功时返回True
    code: '1', //1表示成功，0表示失败
    msg: 'OK' //失败时返回错误原因"该生命周期策略信息已经存在!"
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjsmzqgl/queryLifecycleStrategyInfo' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/sjgl/sjsmzqgl/updateLifecycleStrategyInfo' + '.*'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //失败时返回无法更新原因"该生命周期策略信息正在被启用，无法更新!"
});
Mock.mock(RegExp('http://localhost:8080/sjgl/sjsmzqgl/deleteLifecycleStrategyInfo'), {
    status: '1', //1表示成功，0表示失败
    code: 'True', //成功时返回True
    msg: 'OK' //成功时为"OK"，失败时返回无法删除原因
});
//数据归档
Mock.mock(RegExp('http://localhost:8080/zygdfw/queryJobList' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/zyxxpz/selectZYPZXXByxh' + '.*'), {
    code: 200,
    msg: '成功',
    data: [{ xh: '40', yxxmc: '高分二号数据资源一级产品', mmbs: 'GF2', zylx: '民商数据资源_标准产品影像', sjkb: 'mssjzy_bzcpyxb' }],
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
Mock.mock(RegExp('http://localhost:8080/zygdfw/queryJobLogList' + '.*'), {
    code: 200,
    msg: '成功',
    data: { pageNo: 1, pageSize: 100, totalNum: 6, totalPage: 1, startIndex: 0, autoCount: true },
    pageNo: 1,
    pageSize: 100,
    totalNum: 6,
    totalPage: 1,
    startIndex: 0,
    autoCount: true,
    items: [
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' },
        { zxxh: 'HTZCJD3033', zylx: null, sjmc: null, rznr: '开始进行归档入库处理' }
    ]
    // TODO 此处的list字段是自己添加的，
});
Mock.mock(RegExp('http://localhost:8080/zyxxpz/queryZYPZXXList' + '.*'), {
    code: 200,
    msg: '成功',
    data: { pageNo: 1, pageSize: 11, totalNum: 13, totalPage: 2, startIndex: 0, autoCount: true },
    pageNo: 1,
    pageSize: 11,
    totalNum: 13,
    totalPage: 2,
    startIndex: 0,
    autoCount: true,
    items: [
        {
            xh: '40',
            yxxmc: '高分二号数据资源一级产品',
            mmbs: 'GF2',
            zylx: '民商数据资源_标准产品影像',
            sjkb: 'mssjzy_bzcpyxb',
            pzlx: 'xml',
            sjly: 'ZYZX',
            zyms: '高分二号数据资源一级产品',
            sfqy: null,
            gdzyjsmlList: null
        },
        {
            xh: '40',
            yxxmc: '高分二号数据资源一级产品',
            mmbs: 'GF2',
            zylx: '民商数据资源_标准产品影像',
            sjkb: 'mssjzy_bzcpyxb',
            pzlx: 'xml',
            sjly: 'ZYZX',
            zyms: '高分二号数据资源一级产品',
            sfqy: null,
            gdzyjsmlList: null
        },
        {
            xh: '40',
            yxxmc: '高分二号数据资源一级产品',
            mmbs: 'GF2',
            zylx: '民商数据资源_标准产品影像',
            sjkb: 'mssjzy_bzcpyxb',
            pzlx: 'xml',
            sjly: 'ZYZX',
            zyms: '高分二号数据资源一级产品',
            sfqy: null,
            gdzyjsmlList: null
        }
    ]
});
Mock.mock(RegExp('http://localhost:8080/zyxxpz/insertZYPZXX' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
Mock.mock(RegExp('http://localhost:8080/zyxxpz/deleteZYPZXX' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
Mock.mock(RegExp('http://localhost:8080/zyxxpz/getAllYxxmc' + '.*'), {
    code: 200,
    msg: '成功',
    data: [
        '吉林一号视频07星一级产品',
        '高分一号标准产品',
        '吉林一号光学03星一级产品',
        '吉林一号视频06星标准产品',
        '高景1号B星标准产品',
        '吉林一号光学01星一级产品'
    ]
});
//门户网站管理
Mock.mock(RegExp('http://localhost:8080/mh/saveWx' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
});
Mock.mock(RegExp('http://localhost:8080/mh/delWx' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
}); //卫星编辑
Mock.mock(RegExp('http://localhost:8080/mh/editWx' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp('http://localhost:8080/mh/quertWxLi' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/mh/saveXw' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp('http://localhost:8080/mh/delXw' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
}); //卫星查找
Mock.mock(RegExp('http://localhost:8080/mh/quertWx' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/mh/editXw' + '.*'), {
    code: 200, //状态代号 200表示操作成功，500 服务器错误
    result: '操作成功', // 反馈信息
    message: '操作成功！',
    queryId: '5ea973c2-dc70-4dba-b8ab-2646779c2c7e'
});
Mock.mock(RegExp('http://localhost:8080/mh/quertXwList' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/mh/saveYxzt' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/mh/delYxzt' + '.*'), {
    code: 200, //状态代号 200表示操作成功，500 服务器错误
    result: '操作成功', // 反馈信息
    message: '操作成功！',
    queryId: '5ea973c2-dc70-4dba-b8ab-2646779c2c7e'
});
Mock.mock(RegExp('http://localhost:8080/mh/quertYxzt' + '.*'), {
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
                tplj: 'http://localhost:8080/713/Hydrangeas.jpg',
                file: null
            },
            {
                id: 5,
                ztid: 5,
                sjmc: '数据名称2',
                fbsj: 1594608966694,
                gxsj: 1594608966694,
                px: '2',
                tplj: 'http://localhost:8080/713/Jellyfish.jpg',
                file: null
            },
            {
                id: 6,
                ztid: 5,
                sjmc: '数据名称3',
                fbsj: 1594608966703,
                gxsj: 1594608966703,
                px: '3',
                tplj: 'http://localhost:8080/713/Koala.jpg',
                file: null
            }
        ]
    },
    message: '操作成功！',
    queryId: '91eb4f35-152a-49ee-a444-59ee8fdc92f0'
});
Mock.mock(RegExp('http://localhost:8080/mh/editYxzt' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/mh/quertYxztList' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/xzq/quertProvince' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/xzq/quertCity' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/xzq/quertCounty' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/mh/saveLbt' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
});
Mock.mock(RegExp('http://localhost:8080/mh/delLbt' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
});
Mock.mock(RegExp('http://localhost:8080/mh/editLbt' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
});
Mock.mock(RegExp('http://localhost:8080/mh/saveTzgg'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp('http://localhost:8080/mh/editTzgg'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp('http://localhost:8080/mh/delTzgg'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp('http://localhost:8080/mh/quertTzggList' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/mh/quertTzgg' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/zyxxpz/insertXMLPzxx' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
Mock.mock(RegExp('http://localhost:8080/zygdfw/queryJobList' + '.*'), {
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
            sjml: '//30.249.51.231/jhzx/RECEIVE_DATA/gf',
            sjmc: 'GF1_PMS1_E116.0_N38.9_20190712_L1A0004110997.tar.gz',
            yxj: '2',
            sjl: 453.977,
            cjsj: '2020-06-08 11:44:00',
            wcsj: '2020-06-08 11:45:33',
            cljg: '成功',
            sjbh: 'GF1_4110997_PMS1_LEVEL1A',
            rwlx: '新增',
            mmbs: 'GF1'
        },
        {
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
            mmbs: 'GF1'
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
    mmbs: 'GF1'
});
Mock.mock(RegExp('http://localhost:8080/zyxxpz/queryPzzt' + '.*'), {
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
Mock.mock(RegExp('http://localhost:8080/zyxxpz/getSjkb' + '.*'), {
    code: 200,
    msg: '成功',
    data: [
        {
            zylx: '军口降解密数据资源_标准产品影像', //资源类型
            sjkb: 'jkjjmsjzy_bzcpyxb' //数据库表
        },
        {
            zylx: '军口降解密数据资源_气象卫星产品',
            sjkb: 'jkjjmsjzy_qxwxcpb'
        },
        {
            zylx: '军口降解密信息资源_军事测绘产品',
            sjkb: 'jkjjmxxzy_jsch'
        },
        {
            zylx: '基础地理信息数据',
            sjkb: 'msxxzy_dlkjxxcpb'
        },
        {
            zylx: '民商信息资源_地理空间信息产品表',
            sjkb: 'msxxzy_dlkjxxcpb'
        }
    ]
});
Mock.mock(RegExp('http://localhost:8080/datafw/sjhjRgtask' + '.*'), {
    code: 200, //状态代号 200表示操作成功，500 服务器错误
    result: '操作成功', // 反馈信息
    message: '操作成功！',
    queryId: '5ea973c2-dc70-4dba-b8ab-2646779c2c7e'
});
Mock.mock(RegExp('http://localhost:8080/datafw/sjlzRgtask' + '.*'), {
    code: 200, //状态代号 200表示操作成功，500 服务器错误
    result: '操作成功', // 反馈信息
    message: '操作成功！',
    queryId: '5ea973c2-dc70-4dba-b8ab-2646779c2c7e'
});
Mock.mock(RegExp('http://localhost:8080/sjhjgl/querySjhjcl' + '.*'), {
    code: 200, //接口状态
    result: {
        pageNo: 1, //当前页
        pageSize: 10, //当前页大小
        totalNum: 2, //总条数
        isMore: 0,
        totalPage: 1, // 总页数
        startIndex: 0,
        autoCount: true,
        items: [
            {
                id: '53',
                name: 'ls', //策略名称
                level: '1', //策略级别
                satelliteid: 'GF1', // 卫星名称
                state: 'stop', //状态   true启用 、stop 停用
                addtime: 1594107150000,
                gxsj: 1594107150000,
                sjjg: null, //时间间隔
                qysj: null,
                rkdate: '2020-07-07 15:32:30', //入库时间
                gxdate: '2020-07-07 15:32:30', // 更新时间
                qydate: null //启用时间
            },
            {
                id: '52',
                name: 'ls',
                level: '1',
                satelliteid: 'GF1',
                state: 'true',
                addtime: 1594107145000,
                gxsj: 1594107145000,
                sjjg: null,
                qysj: null,
                rkdate: '2020-07-07 15:32:25',
                gxdate: '2020-07-07 15:32:25',
                qydate: null
            }
        ]
    },
    message: '操作成功！',
    queryId: '171d168d-6dbd-4b33-8ef3-6e23edb67fc6'
});
Mock.mock(RegExp('http://localhost:8080/sjhjgl/insertSJHJCL' + '.*'), {
    code: 200, //状态代号 200表示操作成功，500 服务器错误
    result: '操作成功', // 反馈信息
    message: '操作成功！',
    queryId: '5ea973c2-dc70-4dba-b8ab-2646779c2c7e'
});
Mock.mock(RegExp('http://localhost:8080/sjhjgl/editSjhjcl' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp('http://localhost:8080/sjhjgl/updateSjhjcl' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
});
Mock.mock(RegExp('http://localhost:8080/sjhjgl/deleteSjhjcl' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp('http://localhost:8080/sjhjgl/querySjhjjsdz' + '.*'), {
    code: 200,
    result: {
        pageNo: 1,
        pageSize: 10,
        totalNum: 2,
        isMore: 0,
        totalPage: 1,
        startIndex: 0,
        autoCount: true,
        items: [
            {
                id: '55',
                type: '1', //地址类型，1是共享形式， 2是ftp形式
                name: 'ls', //地址名称
                ip: '172.16.147.34', //iP地址
                portnum: '3306', //端口号
                dataurl: '\\\\172.16.137.153\\data\\file', //数据路径
                username: null, //用户名
                password: '123456', //密码
                addtime: 1594107145000,
                gxsj: 1594107145000,
                rksj: '2020-07-07', //入库时间
                gxtime: '2020-07-07 15:32:25', //更新时间
                gxmllj: null,
                ccwjjlj: null
            },
            {
                id: '55',
                type: '1', //地址类型，1是共享形式， 2是ftp形式
                name: 'ls', //地址名称
                ip: '172.16.147.34', //iP地址
                portnum: '3306', //端口号
                dataurl: '\\\\172.16.137.153\\data\\file', //数据路径
                username: null, //用户名
                password: '123456', //密码
                addtime: 1594107145000,
                gxsj: 1594107145000,
                rksj: '2020-07-07', //入库时间
                gxtime: '2020-07-07 15:32:25', //更新时间
                gxmllj: null,
                ccwjjlj: null
            },
            {
                id: '55',
                type: '1', //地址类型，1是共享形式， 2是ftp形式
                name: 'ls', //地址名称
                ip: '172.16.147.34', //iP地址
                portnum: '3306', //端口号
                dataurl: '\\\\172.16.137.153\\data\\file', //数据路径
                username: null, //用户名
                password: '123456', //密码
                addtime: 1594107145000,
                gxsj: 1594107145000,
                rksj: '2020-07-07', //入库时间
                gxtime: '2020-07-07 15:32:25', //更新时间
                gxmllj: null,
                ccwjjlj: null
            },
            {
                id: '55',
                type: '1', //地址类型，1是共享形式， 2是ftp形式
                name: 'ls', //地址名称
                ip: '172.16.147.34', //iP地址
                portnum: '3306', //端口号
                dataurl: '\\\\172.16.137.153\\data\\file', //数据路径
                username: null, //用户名
                password: '123456', //密码
                addtime: 1594107145000,
                gxsj: 1594107145000,
                rksj: '2020-07-07', //入库时间
                gxtime: '2020-07-07 15:32:25', //更新时间
                gxmllj: null,
                ccwjjlj: null
            }
        ]
    },
    message: '操作成功！',
    queryId: '83d9ac22-060d-470a-816a-9d25c504caef'
});
Mock.mock(RegExp('http://localhost:8080/sjhjgl/insertSJHJJSDZ' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '68863bd3-4a2c-48e5-8e36-0909df68bf47'
});
Mock.mock(RegExp('http://localhost:8080/sjhjgl/editSjhjjsdz' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '68863bd3-4a2c-48e5-8e36-0909df68bf47'
});
Mock.mock(RegExp('http://localhost:8080/sjhjgl/deleteSjhjjsdz' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
//数据流转服务策略管理
Mock.mock(RegExp('http://localhost:8080/sjlzfw/editSjlzjsdz' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp('http://localhost:8080/sjlzfw/querySjlzcl' + '.*'), {
    code: 200, //接口状态
    result: {
        pageNo: 1, //当前页
        pageSize: 10, //当前页大小
        totalNum: 2, //总条数
        isMore: 0,
        totalPage: 1, // 总页数
        startIndex: 0,
        autoCount: true,
        items: [
            {
                id: '53',
                name: 'ls', //策略名称
                level: '1', //策略级别
                satelliteid: 'GF1', // 卫星名称
                state: 'stop', //状态   true启用 、stop 停用
                addtime: 1594107150000,
                gxsj: 1594107150000,
                sjjg: null, //时间间隔
                qysj: null,
                rkdate: '2020-07-07 15:32:30', //入库时间
                gxdate: '2020-07-07 15:32:30', // 更新时间
                qydate: null //启用时间
            },
            {
                id: '52',
                name: 'ls',
                level: '1',
                satelliteid: 'GF1',
                state: 'true',
                addtime: 1594107145000,
                gxsj: 1594107145000,
                sjjg: null,
                qysj: null,
                rkdate: '2020-07-07 15:32:25',
                gxdate: '2020-07-07 15:32:25',
                qydate: null
            }
        ]
    },
    message: '操作成功！',
    queryId: '171d168d-6dbd-4b33-8ef3-6e23edb67fc6'
});
Mock.mock(RegExp('http://localhost:8080/sjlzfw/insertSJLZFWCL' + '.*'), {
    code: 200, //状态代号 200表示操作成功，500 服务器错误
    result: '操作成功', // 反馈信息
    message: '操作成功！',
    queryId: '5ea973c2-dc70-4dba-b8ab-2646779c2c7e'
});
Mock.mock(RegExp('http://localhost:8080/sjlzfw/deleteSjlzcl' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp('http://localhost:8080/sjlzfw/updateSjlzcl' + '.*'), {
    code: 200,
    result: '操作成功',
    message: '操作成功！',
    queryId: '52628a61-e329-4d60-916c-339e7f642d85'
});
Mock.mock(RegExp('http://localhost:8080/sjlzfw/deleteSjlzjsdz' + '.*'), {
    code: 200,
    result: '操作成功！',
    message: '操作成功！',
    queryId: '4229fd7a-d80f-48f2-b957-950bb0dac92f'
});
Mock.mock(RegExp('http://localhost:8080/sjlzfw/querySjlzjsdz' + '.*'), {
    code: 200,
    result: {
        pageNo: 1,
        pageSize: 10,
        totalNum: 2,
        isMore: 0,
        totalPage: 1,
        startIndex: 0,
        autoCount: true,
        items: [
            {
                id: '55',
                type: '1', //地址类型，1是共享形式， 2是ftp形式
                name: 'ls', //地址名称
                ip: '172.16.147.34', //iP地址
                portnum: '3306', //端口号
                dataurl: '\\\\172.16.137.153\\data\\file', //数据路径
                username: null, //用户名
                password: '123456', //密码
                addtime: 1594107145000,
                gxsj: 1594107145000,
                rksj: '2020-07-07', //入库时间
                gxtime: '2020-07-07 15:32:25', //更新时间
                gxmllj: null,
                ccwjjlj: null
            },
            {
                id: '55',
                type: '1', //地址类型，1是共享形式， 2是ftp形式
                name: 'ls', //地址名称
                ip: '172.16.147.34', //iP地址
                portnum: '3306', //端口号
                dataurl: '\\\\172.16.137.153\\data\\file', //数据路径
                username: null, //用户名
                password: '123456', //密码
                addtime: 1594107145000,
                gxsj: 1594107145000,
                rksj: '2020-07-07', //入库时间
                gxtime: '2020-07-07 15:32:25', //更新时间
                gxmllj: null,
                ccwjjlj: null
            },
            {
                id: '55',
                type: '1', //地址类型，1是共享形式， 2是ftp形式
                name: 'ls', //地址名称
                ip: '172.16.147.34', //iP地址
                portnum: '3306', //端口号
                dataurl: '\\\\172.16.137.153\\data\\file', //数据路径
                username: null, //用户名
                password: '123456', //密码
                addtime: 1594107145000,
                gxsj: 1594107145000,
                rksj: '2020-07-07', //入库时间
                gxtime: '2020-07-07 15:32:25', //更新时间
                gxmllj: null,
                ccwjjlj: null
            }
        ]
    },
    message: '操作成功！',
    queryId: '83d9ac22-060d-470a-816a-9d25c504caef'
});
Mock.mock(RegExp('http://localhost:8080/zyxxpz/editXmlPzxx' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
Mock.mock(RegExp('http://localhost:8080/zyxxpz/editWJJPzxx' + '.*'), [
    {
        code: 200,
        msg: '成功',
        data: null
    }
]);
Mock.mock(RegExp('http://localhost:8080/zyxxpz/insertSMWJLJ' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
Mock.mock(RegExp('http://localhost:8080/zyxxpz/updateSMWJLJ' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
Mock.mock(RegExp('http://localhost:8080/zyxxpz/deleteSMWJLJ' + '.*'), {
    code: 200,
    msg: '成功',
    data: null
});
