<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/DataOperationAuth1' }">数据操作权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>订购权限等级设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleAdd">添加权限</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" :disabled="delAllDisabled" @click="delAllSelection"
                    >批量删除</el-button
                >
                <el-input
                    v-model="purchaseType"
                    placeholder="查询权限名称"
                    @keyup.enter.native="handleSearch"
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
                @selection-change="handleSelectionChange($event)"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="150" align="center"></el-table-column>
                <el-table-column prop="purchaseType" label="业务属性" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete([scope.row.purchaseType])"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页暂时不用隐藏，不要删除 -->
            <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    @current-change="handlePageChange"
                    :total="pageTotal"
                ></el-pagination>
            </div> -->
        </div>

        <!-- 新增、编辑弹出框 -->
        <el-dialog
            v-dialogDrag
            :close-on-click-modal="false"
            :title="addOrEditTitle ? '新增' : '编辑'"
            :visible.sync="addOrEditVisible"
            width="30%"
        >
            <el-form ref="form" :model="purchaseTypeFrom" label-width="70px">
                <el-form-item label="id" prop="id" style="display: none;">
                    <el-input v-model="purchaseTypeFrom.id"></el-input>
                </el-form-item>
                <el-form-item label="开放等级" prop="purchaseType">
                    <el-input type="textarea" v-model="purchaseTypeFrom.purchaseType"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="submintAddOrEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            delAllDisabled: true, // 批量删除按钮状态
            purchaseType: '', // 查询开放等级名称
            purchaseTypeFrom: {
                id: '',
                purchaseType: ''
            }, // 新增、编辑提交参数
            addOrEditVisible: false, // 新增、编辑弹出框显示隐藏
            addOrEditTitle: true, // 新增true、编辑false
            tableData: [
                // {
                //     id: 1,
                //     purchaseType: '业务属性1',
                //     lastModifiedTime: 1594052284900
                // }, {
                //     id: 2,
                //     purchaseType: '业务属性2',
                //     lastModifiedTime: 1594052284900
                // }, {
                //     id: 3,
                //     purchaseType: '业务属性3',
                //     lastModifiedTime: 1594052284900
                // }
            ], // 表格数据
            multipleSelection: [], // 多选项
            pageTotal: 0 // 页码总数
        };
    },
    created() {
        this.handleSearch();
    },
    methods: {
        // 点击搜索按钮
        handleSearch() {
            this.$api.GLYQXGL.queryPurchaseType(this.purchaseType).then((res) => {
                this.qxResultHandle(res, () => {
                    this.tableData = res.data.rows;
                    this.pageTotal = res.data.Total;
                });
            });
        },
        // 分页导航
        handlePageChange(val) {
            console.log(val);
            this.handleSearch();
        },
        // 编辑按钮
        handleEdit(index, row) {
            console.log(row);
            this.addOrEditVisible = true;
            this.addOrEditTitle = false;
            // 编辑参数需要加id
            this.purchaseTypeFrom.id = '';
            for (let key in this.purchaseTypeFrom) {
                this.purchaseTypeFrom[key] = row[key];
            }
        },
        // 新增按钮
        handleAdd() {
            this.addOrEditVisible = true;
            this.addOrEditTitle = true;
            // 新增参数不需要id
            delete this.purchaseTypeFrom.id;
            for (let key in this.purchaseTypeFrom) {
                this.purchaseTypeFrom[key] = '';
            }
        },
        // 新增编辑保存提交
        submintAddOrEdit() {
            console.log(this.purchaseTypeFrom);
            // 新增保存
            if (this.addOrEditTitle) {
                this.$api.GLYQXGL.insertPurchaseType(this.purchaseTypeFrom).then((res) => {
                    this.qxResultHandle(res, () => {
                        this.handleSearch();
                        this.addOrEditVisible = false;
                    });
                });
            }
            // 编辑保存
            if (!this.addOrEditTitle) {
                this.$api.GLYQXGL.updatePurchaseType(this.purchaseTypeFrom).then((res) => {
                    this.qxResultHandle(res, () => {
                        this.handleSearch();
                        this.addOrEditVisible = false;
                    });
                });
            }
        },
        // 删除操作
        handleDelete(ids) {
            console.log(ids);
            var that = this;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    that.$api.GLYQXGL.deletePurchaseType(ids).then((res) => {
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
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = [];
            this.delAllDisabled = val.length > 0 ? false : true;
            // console.log(val);
            for (let i in val) {
                this.multipleSelection.push(val[i].purchaseType);
            }
        },
        // 删除多选
        delAllSelection() {
            this.handleDelete(this.multipleSelection);
        }
    }
};
</script>

<style scoped>
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
</style>
