<template>
    <div id="user">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理员权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户角色配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addContent">新增用户</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" :disabled="delAllDisiable" @click="delAllSelection">
                    批量删除
                </el-button>
                <el-input v-model="query.name" placeholder="请输入待查询角色" class="handle-input mr10"></el-input>
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
                <el-table-column prop="userName" min-width="100" label="用户名称" align="center"></el-table-column>
                <el-table-column prop="roleName" min-width="140" label="用户角色" align="center"></el-table-column>
                <el-table-column prop="password" min-width="100" label="用户密码" align="center"></el-table-column>
                <el-table-column prop="registerTime" min-width="130" label="用户注册时间" align="center"></el-table-column>
                <el-table-column prop="organizationName" min-width="140" label="用户所属机构名称" align="center"></el-table-column>
                <el-table-column label="详情" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="lookUserinfoDetail(scope.$index, scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="用户角色修改" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">用户角色修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="是否启用" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.enabled"
                            :active-value="true"
                            :inactive-value="false"
                            @change="changeSwitch(scope.row.userId, $event)"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete([scope.row.userId])">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :page-size="query.pageSize"
                    :current-page="query.pageIndex"
                    @current-change="handlePageChange"
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>
        
        <!-- 用户信息新增、编辑 -->
        <el-dialog :title="addOrEditTitle ? '用户信息新增' : '用户信息编辑'" :visible.sync="addOrEditVisible" width="50%">
            <el-form ref="form" :model="userinfoFrom" label-width="140px">
                <el-form-item label="用户名称">
                    <el-input v-model="userinfoFrom.userName"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="userinfoFrom.address"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="userinfoFrom.password"></el-input>
                </el-form-item>
                <el-form-item label="邮编">
                    <el-input v-model="userinfoFrom.zipcode"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                    <el-input v-model="userinfoFrom.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="用户所属机构名称">
                    <el-input v-model="userinfoFrom.organizationName"></el-input>
                </el-form-item>
                <el-form-item label="传真号码">
                    <el-input v-model="userinfoFrom.faxNumber"></el-input>
                </el-form-item>
                <el-form-item label="用户所属机构类型">
                    <el-input v-model="userinfoFrom.organizationType"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="userinfoFrom.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUserinfo">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 用户详情信息 -->
        <el-dialog :title="userinfoDetail.userName + '用户详情信息'" :visible.sync="userDetailVisible" width="50%">
            <el-form ref="form" :model="userinfoDetail" label-width="140px">
                <el-form-item label="用户编号">
                    <el-input v-model="userinfoDetail.userId"></el-input>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="userinfoDetail.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="userinfoDetail.password"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="userinfoDetail.address"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="userinfoDetail.password"></el-input>
                </el-form-item>
                <el-form-item label="邮编">
                    <el-input v-model="userinfoDetail.zipcode"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                    <el-input v-model="userinfoDetail.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="用户所属机构名称">
                    <el-input v-model="userinfoDetail.organizationName"></el-input>
                </el-form-item>
                <el-form-item label="传真号码">
                    <el-input v-model="userinfoDetail.faxNumber"></el-input>
                </el-form-item>
                <el-form-item label="用户所属机构类型">
                    <el-input v-model="userinfoDetail.organizationType"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="userinfoDetail.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="userDetailVisible = false">关 闭</el-button>
            </span>
        </el-dialog>

        <!-- 用户角色修改 -->
        <admin-auth ref="AdminAuth"></admin-auth>
    </div>
</template>

<script>
import AdminAuth from './components/AdminAuth'

export default {
    name: 'basetable',
    components: {AdminAuth},
    data() {
        return {
            // --------------- 用户表格展示 ---------
            query: { // 查询参数
                userName: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    "id": 1,
                    "userId": 200001,
                    "roleName": "管理员,管理员1",
                    "password": "778989",
                    "registerTime": 1592972810000,
                    "enabled": false,
                    "userName": "管理员1",
                    "organizationName": "中央",
                    "organizationType": "权力机关",
                    "address": "海淀区",
                    "zipcode": "222222",
                    "phoneNumber": 18254678945,
                    "email": "77542552@qq.com",
                    "lastModifiedTime": 1592972809800,
                    "faxNumber": "0311-5252454"
                }, {
                    "id": 2,
                    "userId": 200002,
                    "roleName": "管理员,管理员2",
                    "password": "778989",
                    "registerTime": 1592972810000,
                    "enabled": true,
                    "userName": "管理员2",
                    "organizationName": "中央",
                    "organizationType": "权力机关",
                    "address": "海淀区",
                    "zipcode": "222222",
                    "phoneNumber": 18254678945,
                    "email": "77542552@qq.com",
                    "lastModifiedTime": 1592972809800,
                    "faxNumber": "0311-5252454"
                }
            ], // 列表内容
            pageTotal: 50,
            multipleSelection: [], // 选项框选中项
            delAllDisiable: true, // 批量删除按钮状态
            // 用户新增、修改提交表单参数
            userinfoFrom: {
                "userId": '',
                "password": "",
                "enabled": false,
                "userName": "",
                "organizationName": "",
                "organizationType": "",
                "address": "",
                "zipcode": "",
                "phoneNumber": '',
                "email": "",
                "faxNumber": ""
            },
            addOrEditVisible: false, // 新增、编辑弹窗显示隐藏
            addOrEditTitle: true, // true 新增 false 编辑
            userinfoDetail: {}, // 当前用户详情信息
            userDetailVisible: false, // 用户详情信息展示
            // ----------------- 用户角色修改 ----------
        };
    },
    created() {
        this.handleSearch()
    },
    methods: {
        // --------------- 用户信息表格增删改查、详情 ---------------
        // 触发搜索按钮
        handleSearch() {
            this.$api.GLYQXGL.queryAdminInfo(this.query).then(res => {
                if (res .code == 1) {
                    this.tableData = res.data.rows;
                    this.pageTotal = res.data.Total;
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.query.pageIndex = val;
            this.handleSearch()
        },
        // 删除用户
        handleDelete(ids) {
            console.log(ids)
            var that = this;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                that.$api.GLYQXGL.deleteAdminInfo(ids).then(res => {
                    if (res.code == 1) {
                        that.handleSearch()
                        that.$message({
                            message: res.msg,
                            type: 'success'
                        })
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            })
            .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.delAllDisiable = val.length > 0 ? false : true;
            this.multipleSelection = [];
            for (var i in val) {
                this.multipleSelection.push(val[i].userId)
            }
        },
        // 删除多选
        delAllSelection() {
            this.handleDelete(this.multipleSelection)
        },
        // 新增用户按钮
        addContent() {
            // 删除userId字段，不需要
            delete this.userinfoFrom.userId
            this.addOrEditVisible = true;
            this.addOrEditTitle = true;
            for (var key in this.userinfoFrom) {
                this.userinfoFrom[key] = ''
            }
            // 默认禁用该用户
            this.userinfoFrom.enabled = false
        },
        // 编辑操作
        handleEdit(index, row) {
            // 天添加userId字段，需要
            this.userinfoFrom.userId = '';
            // 编辑时加上该字段
            this.userinfoFrom.enabled = false
            this.addOrEditVisible = true;
            this.addOrEditTitle = false;
            for (var key in this.userinfoFrom) {
                this.userinfoFrom[key] = row[key]
            }
        },
        // 新增编辑用户信息提交保存
        submitUserinfo () {
            console.log(this.userinfoFrom)
            // 新增
            if (this.addOrEditTitle) {
                this.$api.GLYQXGL.saveAdminInfo(this.userinfoFrom).then(res => {
                    if (res.code == 1) {
                        this.handleSearch()
                        this.addOrEditVisible = false
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            // 编辑
            if (!this.addOrEditTitle) {
                this.$api.GLYQXGL.updateAdminInfo(this.userinfoFrom).then(res => {
                    if (res.code == 1) {
                        this.handleSearch()
                        this.addOrEditVisible = false
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        // 查看当前用户详情信息
        lookUserinfoDetail (index, row) {
            console.log(row)
            this.userinfoDetail = row
            this.userDetailVisible = true
        },
        // 用户启用禁用功能
        changeSwitch (userId, enabled) {
            console.log(userId, enabled)
            var that = this;
            this.$confirm('确定要操作吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                that.$api.GLYQXGL.updateAdminState({userId, enabled}).then(res => {
                    if (res.code ==1) {
                        that.handleSearch()
                        that.$message({
                            message: res.msg,
                            type: 'success'
                        })
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            })
            .catch(() => {});
        },
        // --------------------------- 用户角色修改 -----------------------
    }
};
</script>

<style>
* {
    user-select: none;
}
#user .handle-box {
    margin-bottom: 20px;
}

#user .handle-select {
    width: 120px;
}

#user .handle-input {
    width: 300px;
    display: inline-block;
}
#user .table {
    width: 100%;
    font-size: 14px;
    text-align: center;
}
#user .red {
    color: #ff0000;
}
#user .mr10 {
    margin-right: 10px;
}
#user .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
    text-align: center;
}

#user .data-table {
    margin-top: 20px;
    display: flex;
}

#user .left {
    width: 50%;
    float: left;
}

#user .left #user .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid gray;
    text-align: center;
}

#user .content {
    border: 1px solid gray;
}
#user #permissList {
    width: 100%;
    height: 20em;
    display: flex;
    justify-content: space-between;
}
#user .dialogBox {
    display: flex;
    justify-content: space-evenly;
}
#user .checkBoxItem ul {
    height: 20em;
    overflow-y: scroll;
    text-align: center;
}
#user .checkBoxItem li {
    cursor: pointer;
    margin-bottom: em;
    list-style: none;
    line-height: 3em;
}
#user .checkBoxItem button {
    margin: 0;
}
#user .checkBoxItem {
    list-style: none;
}
#user .dialogBox > * {
    padding: 1em;
    margin: 2em;
}
#user #perissList .el-dialog__body {
    height: 26em;
}
#Permissiontable {
    outline: none;
    /* border-color: #69a1fd; */
    border-radius: 0.2em;
    width: 100%;
}
#Permissiontable tr {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
#Permissiontable td {
    text-align: center;
    width: 100%;
}
#Permissiontable .data p {
    display: flex;
    justify-content: space-evenly;
}
#Permissiontable .data p:nth-child(1) {
    background: #69a1fd;
    color: #fff;
}
#Permissiontable .data p span {
    text-align: center;
    width: 30%;
    text-align: center;
}
#Permissiontable .data p span:nth-child(1) {
    width: 40% !important;
}
#Permissiontable,
#Permissiontable tr,
#Permissiontable td {
    border: 0.05em solid #69a1fd;
}
/* ::-webkit-scrollbar { */
/* display: none; */
/* } */

li.active {
    color: #fff;
    background: #69a1fd;
    border-radius: 0.2em;
}
</style>
