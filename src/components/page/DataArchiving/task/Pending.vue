<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据归档</el-breadcrumb-item>
                <el-breadcrumb-item>待处理任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="执行序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="资源类型"></el-table-column>
                <el-table-column prop="name1" label="卫星代号"></el-table-column>
                <el-table-column prop="name2" label="数据目录"></el-table-column>
                <el-table-column prop="name3" label="数据名称"></el-table-column>
                <el-table-column prop="name4" label="数据大小(MB)"></el-table-column>
                <el-table-column prop="name5" label="创建时间"></el-table-column>
                <el-table-column prop="name6" label="完成时间"></el-table-column>
                <el-table-column label="处理结果" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''"
                            >{{ scope.row.state }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    @current-change="handlePageChange"
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>
        <div class="container" style="margin-top: 20px;">
            <div class="handle-box">
                任务日志
                <div style="margin-top: 30px;">
                    <p v-for="(i, j) in logList" :key="j">{{ i.rksj }} {{ i.rznr }}</p>
                </div>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            logList: {
                rksj: ' ',
                rznr: '',
                logs: []
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        // this.getData();
    },
    mounted() {
        //页面加载进来时调取的接口，
        this.$api.SJGD.queryJobList({
            rwzt: '待处理',
            pageNo: this.query.pageIndex,
            pageSize: this.query.pageSize
        })
            .then((res) => {
                console.log(res);
                let data = res.data;
                if (res.msg == '成功') {
                    let dataArr = data.items;
                    let length = dataArr.length;
                    this.tableData.length = 0;
                    for (let i = 0; i < length; i++) {
                        this.tableData.push({
                            id: dataArr[i].zxxh,
                            name: dataArr[i].zylx,
                            name1: dataArr[i].wxbh,
                            name2: dataArr[i].sjml,
                            name3: dataArr[i].sjmc,
                            name4: dataArr[i].sjdx,
                            name5: dataArr[i].cjsj,
                            name6: dataArr[i].wcsj,
                            state: dataArr[i].rwzt
                        });
                    }
                    this.query.pageIndex = data.pageNo;
                    this.query.pageSize = data.pageSize;
                    this.pageTotal = data.totalNum;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
                this.multipleSelection = val;
            } else if (val.length == 1) {
                this.multipleSelection = val;
                if (this.multipleSelection[0].id) {
                    let id = this.multipleSelection[0].id;
                    console.log(id);
                    this.getLogs(id);
                } else {
                    return;
                }
            }
        },
        getLogs(param) {
            this.$api.SJGD.queryJobLogList({
                zxxh: param //执行序号
            })
                .then((result) => {
                    console.log(result);
                    if (result.msg == '成功') {
                        this.logList = result.data.items;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            console.log(val);
            this.$api.SJGD.queryJobList({
                rwzt: '待处理',
                pageNo: val,
                pageSize: 20
            })
                .then((res) => {
                    console.log(res);
                    let data = res.data;
                    if (res.msg == '成功') {
                        let dataArr = data.items;
                        let length = dataArr.length;
                        this.tableData.length = 0;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: dataArr[i].zxxh,
                                name: dataArr[i].zylx,
                                name1: dataArr[i].wxbh,
                                name2: dataArr[i].sjml,
                                name3: dataArr[i].sjmc,
                                name4: dataArr[i].sjdx,
                                name5: dataArr[i].cjsj,
                                name6: dataArr[i].wcsj,
                                state: dataArr[i].rwzt
                            });
                        }
                        this.query.pageIndex = data.pageNo;
                        this.query.pageSize = data.pageSize;
                        this.pageTotal = data.totalNum;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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
