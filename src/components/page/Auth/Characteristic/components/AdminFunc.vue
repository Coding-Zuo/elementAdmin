<template>
    <!-- 管理员功能权限设置 -->
    <div>
        <el-dialog :title="'功能权限设置 >> ' + functionalAuthority.roleName" :visible.sync="funcAuthVisible" width="40%">
            <div>
                <el-tree
                    expond
                    :data="functionList"
                    ref="elTree"
                    show-checkbox
                    node-key="label"
                    @check-change="handleCheckChange()"
                ></el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="funcAuthVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTree">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'AdminFunc',
    data () {
        return {
            // -------------------- 功能权限设置 ---------------------
            functionalAuthority: { // 保存功能权限操作的角色id和角色名称
                roleId: '',
                roleName: ''
            },
            // 功能权限设置弹窗隐藏显示
            funcAuthVisible: false,
            // 根据角色id获取当前角色功能权限列表
            funcAuthItems: [],
            // 功能操作权限提交保存列表
            funcAuthList: [],
            tree: [
                {
                    id: 1,
                    label: 'CASEarth卫星',
                    children: [
                        {
                            id: 4,
                            label: '1级数据',
                            children: [
                                {
                                    id: 9,
                                    label: '1级产品'
                                },
                                {
                                    id: 10,
                                    label: '1级编目'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '2级数据',
                    children: [
                        {
                            id: 5,
                            label: '2级产品'
                        },
                        {
                            id: 6,
                            label: '2级编目'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '高级产品',
                    children: []
                },
                {
                    id: 4,
                    label: '专题产品',
                    children: []
                }
            ],
            functionList: [
                //功能层级选择
                {
                    id: 1,
                    label: 'CASEarth小卫星数据管理与交换服务分系统定制软件',
                    children: [
                        {
                            id: 1,
                            label: '系统监控',
                            children: [
                                {
                                    id: 1,
                                    label: '设备监控'
                                },
                                {
                                    id: 2,
                                    label: '日志'
                                }
                            ]
                        },
                        {
                            id: 2,
                            label: '数据归档',
                            children: [
                                {
                                    id: 1,
                                    label: '已完成任务管理'
                                },
                                {
                                    id: 2,
                                    label: '在执行任务管理'
                                },
                                {
                                    id: 3,
                                    label: '待处理任务管理'
                                },
                                {
                                    id: 4,
                                    label: '资源信息配置'
                                }
                            ]
                        },
                        {
                            id: 3,
                            label: '数据维护管理',
                            children: [
                                {
                                    id: 1,
                                    label: '数据查询维护'
                                },
                                {
                                    id: 2,
                                    label: '存储区维护'
                                },
                                {
                                    id: 3,
                                    label: '数据回收站'
                                }
                            ]
                        },
                        {
                            id: 4,
                            label: '数据策略管理',
                            children: [
                                {
                                    id: 1,
                                    label: '数据流转服务策略管理'
                                },
                                {
                                    id: 2,
                                    label: '数据汇交策略管理'
                                },
                                {
                                    id: 3,
                                    label: '数据迁移策略管理'
                                },
                                {
                                    id: 4,
                                    label: '数据生命周期策略管理'
                                }
                            ]
                        },
                        {
                            id: 5,
                            label: '门户网站管理',
                            children: [
                                {
                                    id: 1,
                                    label: '信息发布',
                                    children: [
                                        {
                                            id: 1,
                                            label: '新闻动态发布'
                                        },
                                        {
                                            id: 2,
                                            label: '通知公告发布'
                                        },
                                        {
                                            id: 3,
                                            label: '卫星介绍发布'
                                        }
                                    ]
                                },
                                {
                                    id: 2,
                                    label: '影像展厅资源配置'
                                },
                                {
                                    id: 3,
                                    label: '轮播图静态资源配置'
                                }
                            ]
                        },
                        {
                            id: 6,
                            label: '管理员权限管理',
                            children: [
                                {
                                    id: 1,
                                    label: '数据默认业务属性管理'
                                },
                                {
                                    id: 2,
                                    label: '数据操作权限管理'
                                },
                                {
                                    id: 3,
                                    label: '数据集合管理'
                                },
                                {
                                    id: 4,
                                    label: '管理员管辖数据范围配置'
                                },
                                {
                                    id: 5,
                                    label: '角色权限管理'
                                },
                                {
                                    id: 6,
                                    label: '用户角色配置'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        // ---------------- 功能权限设置 -----------------
        // 点击功能权限设置按钮
        functionalAuthorityBtn ( row) {
            this.functionalAuthority.roleId = row.roleId;
            this.functionalAuthority.roleName = row.roleName;
            this.funcAuthVisible = true;
            // 根据角色id获取操作
            this.$api.GLYQXGL.queryFuncPrivilege(row.roleId).then(res => {
                if (res.code == 1) {
                    // 当前角色功能项

                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 功能项选择存储
        handleCheckChange (data, checked, indeterminate) {
            console.log(data, checked, indeterminate)
        },
        // 功能操作权限保存
        saveFuncAuthBtn () {

        },
        saveTree() {
            this.funcAuthVisible = false;
            ///* 权限树结构数据 */
            this.$http
                //TODO wzyhqxgl/saveFuncPrivilege  post请求    该链接是一般管理员提交的链接地址，下方地址为超级管理员提交的地址；
                .post(this.api.api + 'glyqxgl/saveFuncPrivilege', {
                    params: {
                        roleId: this.roleId
                    }
                })
                .then((res) => {
                    this.$message.success(`修改权限成功`);
                    this.$set(this.tableData, this.idx, this.form);
                    console.log(/* 权限树结构数据 */ res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}
</script>

<style>

</style>