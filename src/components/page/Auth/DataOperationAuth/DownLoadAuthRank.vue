<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/DataOperationAuth1' }">数据操作权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>下载权限等级设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleAdd">添加权限</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" :disabled="delAllDisabled" @click="delAllSelection">批量删除</el-button>
                <el-input v-model="shareLevel" placeholder="查询权限名称" class="handle-input mr10"></el-input>
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
                <el-table-column prop="downloadLevel" label="操作权限等级" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete([scope.row.downloadLevel])">删除</el-button>
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
        <el-dialog :title="addOrEditTitle ? '新增': '编辑'" :visible.sync="addOrEditVisible" width="30%">
            <el-form ref="form" :model="downloadLevelFrom" label-width="70px">
                <el-form-item label="id" prop="id" style="display:none;">
                    <el-input v-model="downloadLevelFrom.id"></el-input>
                </el-form-item>
                <el-form-item label="开放等级" prop="downloadLevel">
                    <el-input type="textarea" v-model="downloadLevelFrom.downloadLevel"></el-input>
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
            shareLevel: '', // 查询开放等级名称
            downloadLevelFrom: {
                id: '',
                downloadLevel: ''
            }, // 新增、编辑提交参数
            addOrEditVisible: false, // 新增、编辑弹出框显示隐藏
            addOrEditTitle: true, // 新增true、编辑false
            tableData: [
                // {
                //     id: 1,
                //     downloadLevel: '一般共享1',
                //     lastModifiedTime: 1594052284900
                // }, {
                //     id: 2,
                //     downloadLevel: '一般共享2',
                //     lastModifiedTime: 1594052284900
                // }, {
                //     id: 3,
                //     downloadLevel: '一般共享3',
                //     lastModifiedTime: 1594052284900
                // }
            ], // 表格数据
            multipleSelection: [], // 多选项
            pageTotal: 0 // 页码总数
        };
    },
    created() {
        this.handleSearch()
    },
    methods: {
        // 点击搜索按钮
        handleSearch() {
            this.$api.GLYQXGL.queryShareLevel(this.shareLevel).then(res => {
                if (res.code == 1) {
                    this.tableData = res.data.rows
                    this.pageTotal = res.data.Total
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 分页导航
        handlePageChange(val) {
            console.log(val)
            this.handleSearch()
        },
        // 编辑按钮
        handleEdit (index, row) {
            console.log(row)
            this.addOrEditVisible = true;
            this.addOrEditTitle = false
            // 编辑参数需要加id
            this.downloadLevelFrom.id = ''
            for(let key in this.downloadLevelFrom) {
                this.downloadLevelFrom[key] = row[key]
            }
        },
        // 新增按钮
        handleAdd () {
            this.addOrEditVisible = true;
            this.addOrEditTitle = true
            // 新增参数不需要id
            delete this.downloadLevelFrom.id
            for(let key in this.downloadLevelFrom) {
                this.downloadLevelFrom[key] = ''
            }
        },
        // 新增编辑保存提交
        submintAddOrEdit () {
            console.log(this.downloadLevelFrom)
            // 新增保存
            if (this.addOrEditTitle) {
                this.$api.GLYQXGL.insertShareLevel(this.downloadLevelFrom).then(res => {
                    if (res.code == 1) {
                        this.handleSearch()
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            // 编辑保存
            if (!this.addOrEditTitle) {
                this.$api.GLYQXGL.updateShareLevel(this.downloadLevelFrom).then(res => {
                    if (res.code == 1) {
                        this.handleSearch()
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        // 删除操作
        handleDelete(ids) {
            console.log(ids)
            var that = this;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                that.$api.GLYQXGL.deleteShareLevel(ids).then(res => {
                    if (res.code == 1) {
                        that.handleSearch()
                        that.$message({
                            message: res.msg,
                            type:'success'
                        })
                    } else {
                        console.log(err)
                    }
                }).catch(err => {
                    console.log(err)
                })
            })
            .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = []
            this.delAllDisabled = val.length > 0 ? false : true
            // console.log(val);
            for (let i in val) {
                this.multipleSelection.push(val[i].downloadLevel)
            }
        },
        // 删除多选
        delAllSelection() {
            this.handleDelete(this.multipleSelection)
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
