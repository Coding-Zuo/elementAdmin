<template>
    <div class="container" style="margin-top: 10px;">
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleAdd">添加 </el-button>
            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection" :disabled="delDisabled"
                >批量删除
            </el-button>
            <el-select v-model="queryParams.ztId" placeholder="选择展厅" class="handle-select mr10">
                <el-option label="全部展厅" value=""></el-option>
                <el-option v-for="(item, i) in yxztData" :key="i" :label="item.ztmc" :value="item.id"></el-option>
            </el-select>
            <el-input v-model="queryParams.sjmc" placeholder="数据名称" class="handle-input mr10"></el-input>
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
            <el-table-column prop="id" label="编号" width="55" align="center"></el-table-column>
            <el-table-column prop="px" label="排序" width="55" align="center"></el-table-column>
            <el-table-column prop="sjmc" label="数据名称" width="120" align="center"></el-table-column>
            <!-- <el-table-column prop="file" label="文件名"></el-table-column> -->
            <el-table-column prop="ztid" label="所属影像展厅" min-width="150">
                <template slot-scope="scope">
                    <span v-for="(item, i) in yxztData" :key="i" v-show="item.id == scope.row.ztid">{{ item.ztmc }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="tplj" label="影像图" align="center">
                <template slot-scope="scope">
                    <el-image class="table-td-thumb" :src="scope.row.tplj" :preview-src-list="[scope.row.tplj]"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="fbr" label="发布人"></el-table-column>
            <el-table-column prop="fbsj" label="发布时间"></el-table-column>
            <el-table-column prop="gxsj" label="更新时间"></el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <el-dialog :title="addOrEditTitle ? '新增影像' : '编辑影像'" :visible.sync="addOrEditVisible" width="50%">
            <el-form ref="yxForm" :model="addOrEditForm" label-width="100px">
                <el-form-item label="影像展厅">
                    <el-select v-model="addOrEditForm.ztid">
                        <el-option v-for="(item, i) in yxztData" :key="i" :label="item.ztmc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据名称">
                    <el-input v-model="addOrEditForm.sjmc"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="addOrEditForm.px" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="轮播图">
                    <div class="el-input el-input--small">
                        <input
                            type="file"
                            id="file"
                            @change="choiceFile($event)"
                            accept="image/x-png,image/gif,image/jpeg,image/bmp"
                            class="el-input__inner"
                        />
                    </div>
                </el-form-item>
                <el-form-item label="原图片" v-show="!addOrEditTitle">
                    <el-image class="table-td-thumb" :src="dangQianTp" :preview-src-list="[dangQianTp]"></el-image>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddOrEditForm">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详情弹窗 -->
        <el-dialog title="影像详情查看" :visible.sync="detailVisible" width="50%">
            <el-form ref="yxztTpForm" :model="yxztTpDatail" label-width="100px">
                <el-form-item label="编号">
                    <el-input v-model="yxztTpDatail.id"></el-input>
                </el-form-item>
                <el-form-item label="影像展厅">
                    <el-select v-model="yxztTpDatail.ztid">
                        <el-option v-for="(item, i) in yxztData" :key="i" :label="item.ztmc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据名称">
                    <el-input v-model="yxztTpDatail.sjmc"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="yxztTpDatail.px" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="图片路径">
                    <el-input v-model="yxztTpDatail.tplj"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-image class="table-td-thumb" :src="yxztTpDatail.tplj" :preview-src-list="[yxztTpDatail.tplj]"></el-image>
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
    name: 'Shadow',
    data() {
        return {
            queryParams: {
                // 查询参数
                ztId: '',
                sjmc: '', // 数据名称
                fbr: '',
                PageNum: 1,
                PageSize: 10
            },
            yxztData: [],
            tableData: [],
            addOrEditForm: {
                id: '',
                ztid: '',
                sjmc: '',
                px: '',
                file: ''
            }, // 新增、编辑表单数据
            addOrEditVisible: false, // 新增、编辑弹出框隐藏显示状态
            addOrEditTitle: true, // true 新增 false 编辑
            multipleSelection: [], // 多选项
            delDisabled: true,
            pageTotal: 0,
            detailVisible: false, // 影像详情查看弹窗
            yxztTpDatail: {},
            dangQianTp: ''
        };
    },
    created() {
        this.getYxztList();
        this.handleSearch();
    },
    methods: {
        // 获取所有展厅下拉框选项
        getYxztList() {
            this.$api.MHWZGL.quertAllYxzt(this.queryParams)
                .then((res) => {
                    if (res.code == 200) {
                        this.yxztData = res.result;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 获取影像列表
        handleSearch() {
            this.$api.MHWZGL.quertYxztTpList(this.queryParams)
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
            delete this.addOrEditForm.id;
            for (var key in this.addOrEditForm) {
                this.addOrEditForm[key] = '';
            }
        },
        // 操作编辑按钮
        handleEdit(index, row) {
            this.addOrEditVisible = true;
            this.addOrEditTitle = false;
            this.addOrEditForm.id = '';
            for (var key in this.addOrEditForm) {
                this.addOrEditForm[key] = row[key];
            }
            this.dangQianTp = row.tplj;
        },
        // 新增、编辑保存
        submitAddOrEditForm() {
            // 如果没有图片文件，则删除该字段
            if (!this.addOrEditForm.file) {
                delete this.addOrEditForm.file;
            }

            var data = new FormData();
            for (var key in this.addOrEditForm) {
                data.append(key, this.addOrEditForm[key]);
            }

            // 新增
            if (this.addOrEditTitle) {
                if (!this.addOrEditForm.file) {
                    this.$message.info('请选择图片！');
                    return false;
                }
                this.$api.MHWZGL.saveYxztTp(data)
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
                this.$api.MHWZGL.editYxztTp(data)
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
            console.log(val);
            this.multipleSelection = [];
            this.delDisabled = val.length > 0 ? false : true;
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
                    that.$api.MHWZGL.delYxztTp(ids)
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
            this.$api.MHWZGL.quertYxztTp(row.id)
                .then((res) => {
                    if (res.code == 200) {
                        this.yxztTpDatail = res.result;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 操作影像
        handleShadow() {
            this.getYxztList();
        },
        // =============== 图片操作 =================
        choiceFile(e) {
            this.addOrEditForm.file = e.srcElement.files[0];
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