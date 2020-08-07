<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    网站用户权限管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>角色权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleRoleAdd">新增角色</el-button>
                <el-button :disabled="deleteDisabled" type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection"
                    >批量删除</el-button
                >
                <el-input v-model="queryParams.roleName" placeholder="请输入待查询角色" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="150" align="center"></el-table-column>
                <el-table-column label="详情" min-width="60" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleRoleEdit(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="角色权限设置" min-width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="dataManipulationBtn(scope.$index, scope.row)">数据操作权限设置</el-button>
                        <el-button type="text" @click="functionalAuthorityBtn(scope.$index, scope.row)">功能权限设置</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleRoleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete([scope.row.roleId])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :page-size="queryParams.pageSize"
                    :current-page="queryParams.pageIndex"
                    @current-change="handlePageChange"
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>

        <!-- 角色添加编辑 -->
        <el-dialog :title="addOrEditTitle ? '新增角色' : '编辑角色'" :visible.sync="addOrEditVisible" width="50%">
            <el-form ref="addOrEditForm" :model="roleParamsForm" label-width="70px">
                <el-form-item prop="roleId" label="id" style="display: none;"
                    ><el-input v-model="roleParamsForm.roleId"></el-input
                ></el-form-item>
                <el-form-item prop="roleName" label="角色名称(必填)"><el-input v-model="roleParamsForm.roleName"></el-input></el-form-item>
                <el-form-item prop="roleDescription" label="角色描述(必填)"
                    ><el-input type="textarea" v-model="roleParamsForm.roleDescription"></el-input
                ></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrEditSubmit()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 数据操作权限设置 -->
        <el-dialog
            :title="'数据操作权限设置 >> ' + dataManipulationType.roleName"
            :visible.sync="DMAOuterVisible"
            width="500"
            style="padding-bottom: 20px;"
        >
            <table style="width: 100%; text-align: center;">
                <tr>
                    <td>查询</td>
                    <td><el-button @click="setSatelliteBtn(0)" type="text">设置卫星范围</el-button></td>
                </tr>
                <tr>
                    <td>迁移</td>
                    <td><el-button @click="setSatelliteBtn(1)" type="text">设置卫星范围</el-button></td>
                </tr>
                <tr>
                    <td>删除</td>
                    <td><el-button @click="setSatelliteBtn(2)" type="text">设置卫星范围</el-button></td>
                </tr>
            </table>

            <el-dialog
                width="70%"
                :title="(dataManipulationType.type == 0 ? '查询' : dataManipulationType.type == 1 ? '迁移' : '删除') + ' >> 设置卫星范围'"
                :visible.sync="DMAInnerVisible"
                append-to-body
            >
                <div style="border: 1px solid #ececec; padding: 15px;">
                    <el-row><div style="margin-bottom: 20px;">卫星名称</div></el-row>
                    <el-row>
                        <el-col :span="6"><el-input v-model="satelliteName" placeholder="请输入要查询卫星名称"></el-input></el-col>
                        <el-col :span="6"
                            ><el-button @click="querySatelliteName" style="margin-left: 10px;" type="primary">查询</el-button></el-col
                        >
                        <el-col :span="6"><div>可访问卫星列表</div></el-col>
                    </el-row>
                    <el-row style="margin-top: 20px;"
                        ><el-transfer v-model="shuttleBoxCheckItems" :data="satelliteRangeList"></el-transfer
                    ></el-row>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="DMAInnerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveSatelliteBtn">确定</el-button>
                </div>
            </el-dialog>

            <div slot="footer" class="dialog-footer">
                <el-button @click="DMAOuterVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitSatelliteBtn">确定</el-button>
            </div>
        </el-dialog>

        <!-- 功能权限设置 -->
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
    name: 'basetable',
    data() {
        return {
            // ----------------------------- 表格相关 ------------------------------
            queryParams: {
                roleName: '',
                pageIndex: 1,
                pageSize: 10
            }, // 查询参数
            pageTotal: 100,
            deleteDisabled: true,
            tableData: [
                {
                    id: 3,
                    roleId: 10002,
                    roleName: '网站用户11',
                    roleDescription: '123132',
                    lastModifiedTime: 1593796015400
                },
                {
                    id: 4,
                    roleId: 10004,
                    roleName: '网站用户12',
                    roleDescription: '123132',
                    lastModifiedTime: 1593796015400
                }
            ],
            multipleSelection: [], // 角色多选项
            // 新增、编辑角色数据参数
            roleParamsForm: {
                roleId: '', // 新增的时候删除roleId
                roleName: '',
                roleDescription: ''
            },
            addOrEditVisible: false, // 新增或编辑对话框
            addOrEditTitle: true, // 新增true、编辑false对话框标题
            // ----------------------------- 数据操作权限设置 ---------------------------
            DMAOuterVisible: false, // 数据操作权限外层弹窗显示、隐藏
            DMAInnerVisible: false, // 数据操作权限内层弹窗显示、隐藏
            dataManipulationAuthorityData: {}, // 数据操作权限返回数据
            dataManipulationType: {
                type: 0, // 0查询1迁移2删除
                roleId: '', // 当前角色id
                roleName: '' // 当前角色名称
            }, // 数据操作权限中转信息
            searchSatelliteRange: [], // 查询操作卫星列表
            relocateSatelliteRange: [], // 迁移操作卫星列表
            deleteSatelliteRange: [], // 删除操作卫星列表
            satelliteName: '', // 卫星名称
            satelliteRangeList: [
                // {
                //     key: 'WX-1',
                //     label: 'WX-1'
                // }, {
                //     key: 'WX-2',
                //     label: 'WX-2'
                // }, {
                //     key: 'WX-8',
                //     label: 'WX-8'
                // }, {
                //     key: 'WX-4',
                //     label: 'WX-4'
                // }, {
                //     key: 'WX-5',
                //     label: 'WX-5'
                // }, {
                //     key: 'WX-6',
                //     label: 'WX-6'
                // }
            ], // 卫星列表
            shuttleBoxCheckItems: [], // 穿梭框选中项value
            // -------------------- 功能权限设置 ---------------------
            functionalAuthority: {
                // 保存功能权限操作的角色id和角色名称
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
                            label: '网站用户权限管理',
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
                                    label: '网站用户管辖数据范围配置'
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
        };
    },
    created() {
        this.handleSearch();
        // this.querySatelliteName()
    },
    methods: {
        // ------------------------- 角色列表增删改查 -------------------------
        // 触发搜索角色按钮
        handleSearch() {
            this.$api.WZYHQXGL.queryRole(this.queryParams)
                .then((res) => {
                    if (res.code == 1) {
                        this.tableData = res.data.rows;
                        this.pageTotal = res.data.Total;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 角色查询分页导航
        handlePageChange(val) {
            this.queryParams.pageIndex = val;
            this.handleSearch();
        },
        // 角色多选操作
        handleSelectionChange(val) {
            this.deleteDisabled = val.length > 0 ? false : true;
            this.multipleSelection = [];
            for (let i = 0; i < val.length; i++) {
                this.multipleSelection.push(val[i].roleId);
            }
        },
        // 批量删除角色
        delAllSelection() {
            this.handleDelete(this.multipleSelection);
        },
        // 删除角色操作
        handleDelete(ids) {
            console.log(ids);
            var that = this;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    that.$api.WZYHQXGL.deleteRole(ids)
                        .then((res) => {
                            if (res.code == 1) {
                                that.handleSearch();
                                that.$message({
                                    message: res.msg,
                                    type: 'success'
                                });
                            } else {
                                console.log(res);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        },
        // 新增角色按钮
        handleRoleAdd() {
            this.addOrEditVisible = true;
            this.addOrEditTitle = true;
            // 新增提交需要删除id属性
            delete this.roleParamsForm.roleId;
            for (let key in this.roleParamsForm) {
                this.roleParamsForm[key] = '';
            }
        },
        // 编辑角色按钮
        handleRoleEdit(row) {
            this.addOrEditVisible = true;
            this.addOrEditTitle = false;
            this.roleParamsForm.roleId = ''; // 编辑需要加上id属性
            for (let key in this.roleParamsForm) {
                this.roleParamsForm[key] = row[key];
            }
        },
        // 新增、编辑角色信息保存提交
        addOrEditSubmit() {
            console.log(this.roleParamsForm);
            // 新增提交
            if (this.addOrEditTitle) {
                this.$api.WZYHQXGL.insertRole(this.roleParamsForm)
                    .then((res) => {
                        if (res.code == 1) {
                            this.handleSearch();
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            this.addOrEditVisible = false;
                        } else {
                            console.log(res);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

            // 编辑提交
            if (!this.addOrEditTitle) {
                this.$api.WZYHQXGL.updateRole(this.roleParamsForm)
                    .then((res) => {
                        if (res.code == 1) {
                            this.handleSearch();
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            this.addOrEditVisible = false;
                        } else {
                            console.log(res);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        // ----------------------------------- 数据操作权限设置 -------------------------------------
        // 获取卫星列表
        querySatelliteName() {
            this.satelliteRangeList = [];
            this.$api.GLYQXGL.querySatelliteName(this.satelliteName)
                .then((res) => {
                    if (res.code == 1) {
                        let rows = res.data;
                        for (let i = 0; i < rows.length; i++) {
                            this.satelliteRangeList.push({
                                key: rows[i],
                                label: rows[i]
                            });
                        }
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 数据操作权限设置按钮
        dataManipulationBtn(index, row) {
            // this.querySatelliteName() // 放到进入页面时调用
            // 根绝角色id获取数据操作权限对应的卫星
            this.$api.WZYHQXGL.queryDataOpPrivilege(row.roleId)
                .then((res) => {
                    if (res.code == 1) {
                        // 模拟数据
                        // let item = {
                        //     "id": 2,
                        //     "roleId": 10001,
                        //     "searchSatelliteRange": "WX-5 WX-3",
                        //     "relocateSatelliteRange": "",
                        //     "deleteSatelliteRange": "WX-4",
                        //     "lastModifiedTime": 1593462484900
                        // }

                        let item = res.data;
                        this.dataManipulationAuthorityData = item;

                        // 将查询、迁移、删除三组数据解析为数组，方便穿梭框使用
                        /// 查询
                        if (item.searchSatelliteRange) {
                            this.searchSatelliteRange = item.searchSatelliteRange.split(' ');
                        } else {
                            this.searchSatelliteRange = [];
                        }
                        /// 迁移
                        if (item.relocateSatelliteRange) {
                            this.relocateSatelliteRange = item.relocateSatelliteRange.split(' ');
                        } else {
                            this.relocateSatelliteRange = [];
                        }
                        /// 删除
                        if (item.deleteSatelliteRange) {
                            this.deleteSatelliteRange = item.deleteSatelliteRange.split(' ');
                        } else {
                            this.deleteSatelliteRange = [];
                        }
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            // 将角色id和角色名称保存，方便使用
            this.dataManipulationType.roleId = row.roleId;
            this.dataManipulationType.roleName = row.roleName;
            this.DMAOuterVisible = true;
        },
        // 设置卫星范围按钮
        setSatelliteBtn(type) {
            this.dataManipulationType.type = type;
            this.DMAInnerVisible = true;
            switch (type) {
                case 0:
                    this.shuttleBoxCheckItems = this.searchSatelliteRange;
                    break;
                case 1:
                    this.shuttleBoxCheckItems = this.relocateSatelliteRange;
                    break;
                case 2:
                    this.shuttleBoxCheckItems = this.deleteSatelliteRange;
                    break;
            }
        },
        // 保存设置对应的卫星范围
        saveSatelliteBtn() {
            switch (this.dataManipulationType.type) {
                case 0:
                    this.searchSatelliteRange = this.shuttleBoxCheckItems;
                    break;
                case 1:
                    this.relocateSatelliteRange = this.shuttleBoxCheckItems;
                    break;
                case 2:
                    this.deleteSatelliteRange = this.shuttleBoxCheckItems;
                    break;
            }
            this.DMAInnerVisible = false;
        },
        // 数据操作权限设置提交（卫星设置范围提交）
        submitSatelliteBtn() {
            // 提交参数
            let fromData = {
                roleId: this.dataManipulationType.roleId,
                searchSatelliteRange: this.searchSatelliteRange.join(' '),
                relocateSatelliteRange: this.relocateSatelliteRange.join(' '),
                deleteSatelliteRange: this.deleteSatelliteRange.join(' ')
            };

            console.log(fromData);
            // 发送提交请求
            this.$api.WZYHQXGL.saveDataOpPrivilege(fromData)
                .then((rs) => {
                    if (res.code == 1) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // ---------------- 功能权限设置 -----------------
        // 点击功能权限设置按钮
        functionalAuthorityBtn(index, row) {
            this.functionalAuthority.roleId = row.roleId;
            this.functionalAuthority.roleName = row.roleName;
            this.funcAuthVisible = true;
            // 根据角色id获取操作
            this.$api.WZYHQXGL.queryFuncPrivilege(row.roleId)
                .then((res) => {
                    if (res.code == 1) {
                        // 当前角色功能项
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 功能项选择存储
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },
        // 功能操作权限保存
        saveFuncAuthBtn() {},
        saveTree() {
            this.funcAuthVisible = false;
            ///* 权限树结构数据 */
            this.$http
                //TODO wzyhqxgl/saveFuncPrivilege  post请求    该链接是一般网站用户提交的链接地址，下方地址为超级网站用户提交的地址；
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
};
</script>

<style >
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
    text-align: center;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
    text-align: center;
}

/* .search-table {
} */

.search-item {
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    display: flex;
    height: 30px;
}
/* 自定义 */
.OperateState {
    position: absolute;
    box-shadow: 0.9em 0.9em 0.9em rgba(60, 60, 60, 0.5);
    z-index: 1;
    width: 90%;
    height: 27em;
    padding-bottom: 5em;
    border: 0.2em solid #ccc;
    background: #fefefe;
}
.OperateState > div {
    border: none !important;
}
/* .operateMenu {
    user-select: none;
    width: 100%;
} */
/* .operateMenu tr {
    line-height: 2em;
    display: flex;
    justify-content: space-evenly;
}
.operateMenu tr td:nth-child(2) {
    cursor: pointer;
    color: #69a1fd;
    transition: all 0.2s;
} */
/* .operateMenu tr td:nth-child(2):hover {
    border-bottom: 0.1em solid #69a1fd;
    line-height: 1.9em;
} */
.treeNode {
    display: block;
    overflow-y: scroll;
    height: 10em;
    width: 31.4em;
}
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
}
.treeNode .el-checkbox__label {
    width: 6em;
}
.tableTitle {
    width: 10em;
    text-align: center;
}
.checkBox {
    display: flex;
    flex-direction: column;
    width: auto;
}

/* 覆盖原生样式 */
.dialog-footer {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
</style>
