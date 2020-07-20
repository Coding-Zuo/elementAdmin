<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据开放等级设置</el-breadcrumb-item>
                <!--                <el-breadcrumb-item>系统权限管理</el-breadcrumb-item>-->
                <!--                <el-breadcrumb-item>查询权限等级设置</el-breadcrumb-item>-->
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addVisible = true">添加权限</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <!--                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
                <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                <!--                </el-select>-->
                <el-input v-model="query.name" placeholder="查询权限名称" class="handle-input mr10"></el-input>
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
                <el-table-column prop="id" label="序号" width="305" align="center"></el-table-column>
                <el-table-column prop="address" label="操作权限等级" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button type="text" icon="el-icon-edit" @click="showEditVisible(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
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
                ></el-pagination>
                <!-- :total="pageTotal" -->
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="editForm" label-width="70px">
                <el-form-item label="开放等级">
                    <el-input v-model="editForm.rank"></el-input>
                </el-form-item>
                <el-form-item label="等级描述">
                    <el-input type="textarea" v-model="editForm.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="addContectForm" label-width="70px">
                <el-form-item label="开放等级">
                    <el-input v-model="addContectForm.rank"></el-input>
                </el-form-item>
                <el-form-item label="等级描述">
                    <el-input type="textarea" v-model="addContectForm.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addContent()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            tdIndex: '',
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            addContectForm: {
                desc: '',
                rank: ''
            },
            editForm: {
                rank: '',
                desc: ''
            },
            tableData: [
                {
                    id: 1,
                    address: '一般开放'
                },
                {
                    id: 2,
                    address: '内部开放'
                },
                {
                    id: 3,
                    address: '专项开放'
                },
                {
                    id: 4,
                    address: '内部受控级别1'
                },
                {
                    id: 5,
                    address: '内部受控级别2'
                },
                {
                    id: 6,
                    address: '内部受控级别3'
                }
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
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
        this.$http
            .get(this.api.api + 'wzyhqxgl/getDataOpPrivilege')
            .then(result => {
                if (result.data.msg == 'OK') {
                    this.$set(this.tableData, this.idx, this.form);
                    let length = result.data.data.gxjbs.length;
                    for (let i = 0; i < length; i++) {
                        this.tableData.push({
                            id: result.data.data.gxjbs[i].id,
                            address: result.data.data.gxjbs[i].downloadLevel
                        });
                    }
                    this.addVisible = false;
                } else {
                    this.$message({
                        showClose: true,
                        message: '提交失败 ！',
                        type: 'error'
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.$http
                .get(this.api.api + 'wzyhqxgl/queryShareLevel', {
                    params: {
                        shareLevel: this.shareLevel
                    }
                })
                .then(result => {
                    this.tableData = [];
                    this.tableData.push({
                        id: result.data.data.Total,
                        address: result.data.data.rows[0]
                    });
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addContent() {
            this.addVisible = false;
            this.$http
                .post(this.api.api + 'wzyhqxgl/insertSearchLevel', {
                    params: { downloadLevel: this.editForm.desc }
                })
                .then(result => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '数据追加成功 ！'
                        });
                        this.tableData.push({
                            id: this.addContectForm.rank,
                            address: this.addContectForm.desc
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        showEditVisible(index, row) {
            this.editVisible = true;
            this.tdIndex = index;
            this.editForm.rank = row.id;
            this.editForm.desc = row.address;
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$http
                        .post(this.api.api + 'wzyhqxgl/deleteSearchLevel', {
                            params: this.str
                        })
                        .then(result => {
                            console.log(result);
                            if (result.data.msg == 'OK') {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功 ！'
                                });
                                this.tableData.splice(index, 1);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            // console.log(val);
            let params = [];
            for (const i of val) {
                params.push({
                    address: i.address,
                    index: i.id
                });
            }
            this.multipleSelection = params;
        },

        delAllSelection() {
            this.$http
                .post(this.api.api + 'glyqxgl/insertDataSet', {
                    params: this.multipleSelection
                })
                .then(result => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        let length = this.multipleSelection.length;
                        let delList = [];
                        for (let i = 0; i < length; i++) {
                            this.tableData.splice(this.tableData[i].index, 1);
                        }
                        this.$message.error('删除了' + this.multipleSelection);
                        this.multipleSelection = [];
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            // this.form = row;
            this.editVisible = true;
            this.$http
                .get(this.api.api + 'wzyhqxgl/updateSearchLevel', {
                    params: {
                        searchLevel: this.editForm.desc,
                        id: this.editForm.rank
                    }
                })
                .then(result => {
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '提交成功 ！'
                        });
                    }
                    this.tableData[this.tdIndex].address = this.editForm.desc;
                    this.tableData[this.tdIndex].id = this.editForm.rank;
                    this.editVisible = false;
                    console.log(result);
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '提交失败 ！'
                    });
                    console.log(err);
                });
        },
        // 保存编辑
        saveEdit() {
            this.$http
                .get(this.api.api + 'wzyhqxgl/getDataOpPrivilege')
                .then(result => {
                    if (result.data.msg == 'OK') {
                        this.$set(this.tableData, this.idx, this.form);
                        let length = result.data.data.gxjbs.length;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: result.data.data.gxjbs[i].id,
                                address: result.data.data.gxjbs[i].downloadLevel
                            });
                        }
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.addVisible = false;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '提交失败 ！',
                            type: 'error'
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
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
