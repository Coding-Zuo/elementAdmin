<template>
    <div class="container">
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleAdd()">添 加</el-button>
            <el-input
                v-model="queryParams.ztmc"
                placeholder="展厅名称"
                @keyup.enter.native="handleSearch"
                class="handle-input mr10"
            ></el-input>
            <el-input v-model="queryParams.fbr" placeholder="发布人" class="handle-input mr10"></el-input>
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
            <el-table-column prop="id" label="编号" width="100" align="center"></el-table-column>
            <el-table-column prop="ztmc" label="展厅名称" align="center"></el-table-column>
            <el-table-column prop="fbr" label="发布人" align="center"></el-table-column>
            <el-table-column label="详情" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-info" @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next"
                :current-page="queryParams.pageIndex"
                :page-size="queryParams.pageSize"
                :total="pageTotal"
                @current-change="handlePageChange"
            ></el-pagination>
        </div>

        <!-- 新增、编辑弹出框 -->
        <el-dialog
            v-dialogDrag
            :close-on-click-modal="false"
            :title="addOrEditTitle ? '新增影像展厅' : '编辑影像展厅'"
            :visible.sync="addOrEditVisible"
            width="50%"
        >
            <el-form ref="yxztForm" :model="addOrEditFrom" label-width="100px">
                <el-form-item label="展厅名称">
                    <el-input v-model="addOrEditFrom.ztmc"></el-input>
                </el-form-item>
                <el-form-item label="发布人">
                    <el-input v-model="addOrEditFrom.fbr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddOrEditFrom">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详情弹窗 -->
        <el-dialog v-dialogDrag :close-on-click-modal="false" title="影像展厅详情" :visible.sync="detailVisible" width="50%">
            <el-form ref="yxztDetail" :model="yxztDetail" label-width="100px">
                <el-form-item label="编号">
                    <el-input v-model="yxztDetail.id"></el-input>
                </el-form-item>
                <el-form-item label="展厅名称">
                    <el-input v-model="yxztDetail.ztmc"></el-input>
                </el-form-item>
                <el-form-item label="发布人">
                    <el-input v-model="yxztDetail.fbr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="detailVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ExhibitionHall',
    data() {
        return {
            queryParams: {
                // 查询参数
                ztmc: '',
                fbr: '',
                PageNum: 1,
                PageSize: 10
            },
            tableData: [],
            addOrEditFrom: {
                id: '',
                ztmc: '',
                fbr: ''
            }, // 新增、编辑表单数据
            addOrEditVisible: false, // 新增、编辑弹出框隐藏显示状态
            addOrEditTitle: true, // true 新增 false 编辑
            multipleSelection: [], // 多选项
            pageTotal: 0,
            detailVisible: false, // 展厅详情查看弹窗
            yxztDetail: {} // 单条数据详情
        };
    },
    created() {
        this.handleSearch();
    },
    methods: {
        // 获取影像展厅列表
        handleSearch() {
            this.$api.MHWZGL.quertYxztList(this.queryParams).then((res) => {
                this.mhwzglResultHandle(result, () => {
                    this.tableData = res.result.items;
                    this.pageTotal = res.result.totalNum;
                    this.handleShadow();
                });
            });
        },
        // 分页查询
        handlePageChange(index) {
            this.queryParams.PageNum = index;
            this.handleSearch();
        },
        // 操作新增按钮
        handleAdd() {
            this.addOrEditVisible = true;
            this.addOrEditTitle = true;
            delete this.addOrEditFrom.id;
            for (var key in this.addOrEditFrom) {
                this.addOrEditFrom[key] = '';
            }
        },
        // 操作编辑按钮
        handleEdit(index, row) {
            this.addOrEditVisible = true;
            this.addOrEditTitle = false;
            this.addOrEditFrom.id = '';
            for (var key in this.addOrEditFrom) {
                this.addOrEditFrom[key] = row[key];
            }
        },
        // 新增、编辑保存
        submitAddOrEditFrom() {
            console.log(this.addOrEditFrom);
            // 新增
            if (this.addOrEditTitle) {
                this.$api.MHWZGL.saveYxzt(this.addOrEditFrom).then((res) => {
                    this.mhwzglResultHandle(result, () => {
                        this.handleSearch();
                        this.addOrEditVisible = false;
                    });
                });
            }
            // 编辑
            if (!this.addOrEditTitle) {
                this.$api.MHWZGL.editYxzt(this.addOrEditFrom).then((res) => {
                    this.mhwzglResultHandle(result, () => {
                        this.handleSearch();
                        this.addOrEditVisible = false;
                    });
                });
            }
        },
        // 多选项
        handleSelectionChange(val) {
            // console.log(val)
            this.multipleSelection = [];
            val.forEach((element) => {
                this.multipleSelection.push(element.id);
            });
        },
        // 多选删除,格式 1,2,3
        delAllSelection() {
            let ids = this.multipleSelection.join(',');
            this.handleDelete(ids);
        },
        // 删除操作
        handleDelete(ids) {
            console.log(ids);
            var that = this;
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    that.$api.MHWZGL.delYxzt(ids).then((res) => {
                        this.mhwzglResultHandle(result, () => {
                            that.handleSearch();
                            that.$message({
                                message: '删除成功！',
                                type: 'success'
                            });
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 查看详情
        handleDetail(index, row) {
            this.detailVisible = true;
            this.$api.MHWZGL.quertYxzt(row.id).then((res) => {
                this.mhwzglResultHandle(result, () => {
                    this.yxztDetail = res.result;
                });
            });
        },
        // 操作影像
        handleShadow() {
            this.$emit('handleShadow');
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
    width: 200px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
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
}
</style>