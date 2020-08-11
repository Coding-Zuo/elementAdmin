<template>
    <div class="container">
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleAdd()">添 加</el-button>
            <el-input v-model="queryParams.Fbr" placeholder="发布人" class="handle-input mr10"></el-input>
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
            <el-table-column prop="xh" label="序号" width="100" align="center"></el-table-column>
            <el-table-column prop="px" label="排序" width="100" align="center"></el-table-column>
            <el-table-column prop="sfjd" label="是否焦点" align="center"></el-table-column>
            <el-table-column prop="ljdz" label="链接地址" align="center">
                <template slot-scope="scope">
                    <el-image class="table-td-thumb" :src="scope.row.ljdz" :preview-src-list="[scope.row.ljdz]"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="fbr" label="发布人" align="center"></el-table-column>
            <el-table-column prop="fbsj" label="发布时间" align="center"></el-table-column>
            <el-table-column prop="gxsj" label="更新时间" align="center"></el-table-column>
            <el-table-column label="详情" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-info" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.xh)">删除</el-button>
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
        <el-dialog :title="addOrEditTitle ? '新增轮播图' : '编辑轮播图'" :visible.sync="addOrEditVisible" width="50%">
            <el-form ref="yxztForm" :model="addOrEditFrom" label-width="100px">
                <el-form-item label="链接地址">
                    <el-input v-model="addOrEditFrom.ljdz"></el-input>
                </el-form-item>
                <el-form-item label="是否焦点">
                    <el-input v-model="addOrEditFrom.fbr"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="addOrEditFrom.px" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="轮播图">
                    <div class="el-input el-input--small">
                        <input type="file" id="file" @change="choiceFile($event)" accept="image/x-png,image/gif,image/jpeg,image/bmp" class="el-input__inner" />
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddOrEditFrom">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详情弹窗 -->
        <el-dialog title="轮播图详情" :visible.sync="detailVisible" width="50%">
            <el-form ref="lptDetail" :model="lptDetail" label-width="100px">
                <el-form-item label="序号">
                    <el-input v-model="lptDetail.id"></el-input>
                </el-form-item>
                <el-form-item label="路径地址">
                    <el-input v-model="lptDetail.ljdz"></el-input>
                </el-form-item>
                <el-form-item label="是否焦点">
                    <el-input v-model="lptDetail.sfjd"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="lptDetail.px" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="发布人">
                    <el-input v-model="lptDetail.fbr"></el-input>
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
                Fbr: '',
                PageNum: 1,
                PageSize: 10
            },
            tableData: [],
            addOrEditFrom: {
                id: '',
                ljdz: '',
                sfjd: 0, // 是 0 否 1
                px: 1,
                file: ''
            }, // 新增、编辑表单数据
            addOrEditVisible: false, // 新增、编辑弹出框隐藏显示状态
            addOrEditTitle: true, // true 新增 false 编辑
            multipleSelection: [], // 多选项
            pageTotal: 0,
            detailVisible: false, // 轮播图详情查看弹窗
            lptDetail: {} // 单条数据详情
        };
    },
    created() {
        this.handleSearch();
    },
    methods: {
        // 获取轮播图列表
        handleSearch() {
            this.$api.MHWZGL.quertLbtList(this.queryParams)
                .then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.result.items;
                        this.pageTotal = res.result.totalNum;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
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
            delete this.addOrEditFrom.xu;
            for (var key in this.addOrEditFrom) {
                this.addOrEditFrom[key] = '';
            }
            this.addOrEditFrom.sfjd = 0;
        },
        // 操作编辑按钮
        handleEdit(index, row) {
            this.addOrEditVisible = true;
            this.addOrEditTitle = false;
            this.addOrEditFrom.xu = '';
            for (var key in this.addOrEditFrom) {
                this.addOrEditFrom[key] = row[key];
            }
        },
        // 新增、编辑保存
        submitAddOrEditFrom() {
            var data = new FormData();
            for (var key in this.addOrEditform) {
                data.append(key, this.addOrEditform[key]);
            }
            console.log(data);
            // 新增
            if (this.addOrEditTitle) {
                this.$api.MHWZGL.saveLbt(data)
                    .then((res) => {
                        if (res.code == 200) {
                            this.handleSearch();
                            this.addOrEditVisible = false;
                        } else {
                            console.log(res);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            // 编辑
            if (!this.addOrEditTitle) {
                this.$api.MHWZGL.editLbt(data)
                    .then((res) => {
                        if (res.code == 200) {
                            this.handleSearch();
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
        // 多选项
        handleSelectionChange(val) {
            // console.log(val)
            this.multipleSelection = [];
            val.forEach((element) => {
                this.multipleSelection.push(element.xh);
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
                    that.$api.MHWZGL.delYxzt(ids)
                        .then((res) => {
                            if (res.code == 200) {
                                that.handleSearch();
                                that.$message({
                                    message: '删除成功！',
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
            this.$api.MHWZGL.quertLbt(row.xh)
                .then((res) => {
                    if (res.code == 200) {
                        this.lptDetail = res.result;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // =============== 图片操作 =================
        choiceFile(e) {
            this.addOrEditform.file = e.srcElement.files[0];
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