<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    管理员权限管理
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
                <el-input
                    v-model="queryParams.roleName"
                    @keyup.enter.native="handleSearch"
                    placeholder="请输入待查询角色"
                    class="handle-input mr10"
                ></el-input>
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
                        <!-- <el-button type="text" @click="dataManipulationBtn(scope.$index, scope.row)">数据操作权限设置</el-button> -->
                        <el-button type="text" @click="functionalAuthorityBtn(scope.$index, scope.row)">权限设置</el-button>
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
        <el-dialog
            v-dialogDrag
            :close-on-click-modal="false"
            :title="addOrEditTitle ? '新增角色' : '编辑角色'"
            :visible.sync="addOrEditVisible"
            width="50%"
        >
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

        <!-- 管理员数据管理权限设置 -->
        <!-- <admin-data ref="AdminData"></admin-data> -->
        <!-- 管理员功能权限管理 -->
        <admin-func ref="AdminFunc"></admin-func>
    </div>
</template>

<script>
import AdminData from './components/AdminData';
import AdminFunc from './components/AdminFunc';

export default {
    name: 'basetable',
    components: {
        AdminData,
        AdminFunc
    },
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
                    roleName: '管理员11',
                    roleDescription: '123132',
                    lastModifiedTime: 1593796015400
                },
                {
                    id: 4,
                    roleId: 10004,
                    roleName: '管理员12',
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
            addOrEditTitle: true // 新增true、编辑false对话框标题
        };
    },
    created() {
        this.handleSearch();
    },
    methods: {
        // ------------------------- 角色列表增删改查 -------------------------
        // 触发搜索角色按钮
        handleSearch() {
            console.log(1);
            this.$api.GLYQXGL.queryRole(this.queryParams).then((res) => {
                this.qxResultHandle(res, () => {
                    this.tableData = res.data.rows;
                    this.pageTotal = res.data.Total;
                });
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
                    that.$api.GLYQXGL.deleteRole(ids).then((res) => {
                        this.qxResultHandle(res, () => {
                            that.handleSearch();
                            that.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        });
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
                this.$api.GLYQXGL.insertRole(this.roleParamsForm).then((res) => {
                    this.qxResultHandle(res, () => {
                        this.handleSearch();
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.addOrEditVisible = false;
                    });
                });
            }

            // 编辑提交
            if (!this.addOrEditTitle) {
                this.$api.GLYQXGL.updateRole(this.roleParamsForm).then((res) => {
                    this.qxResultHandle(res, () => {
                        this.handleSearch();
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.addOrEditVisible = false;
                    });
                });
            }
        },
        // ---------------------------- 数据操作权限管理 ------------------------------
        // 显示数据操作权限管理弹窗
        // dataManipulationBtn(index, row) {
        //     this.$refs.AdminData.dataManipulationBtn(row);
        // },
        // ---------------------------- 功能权限管理 ---------------------------------
        // 显示功能权限管理弹窗
        functionalAuthorityBtn(index, row) {
            this.$refs.AdminFunc.functionalAuthorityBtn(row);
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
