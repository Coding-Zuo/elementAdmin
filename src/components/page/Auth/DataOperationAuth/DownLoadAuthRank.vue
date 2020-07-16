<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据共享级别设置</el-breadcrumb-item>
                <!--                <el-breadcrumb-item>系统权限管理</el-breadcrumb-item>-->
                <!--                <el-breadcrumb-item>下载权限等级设置</el-breadcrumb-item>-->
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
                @selection-change="handleSelectionChange"
            >
                <!--                <el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="id" label="序号" width="305" align="center"></el-table-column>
                <el-table-column prop="address" label="操作权限等级" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="showEdit(scope.$index, scope.row)">编辑</el-button>
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
                    :page-size="query.pageSize"
                    @current-change="handlePageChange"
                    :current-page="query.pageIndex"
                ></el-pagination>
                <!-- :total="pageTotal" -->
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="editForm" label-width="70px">
                <el-form-item label="共享等级">
                    <el-input v-model="editForm.share"></el-input>
                </el-form-item>
                <el-form-item label="等级描述">
                    <el-input type="textarea" v-model="editForm.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="addContectForm" label-width="70px">
                <el-form-item label="共享等级">
                    <el-input v-model="addContectForm.share"></el-input>
                </el-form-item>
                <el-form-item label="等级描述">
                    <el-input type="textarea" v-model="addContectForm.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit()">确 定</el-button>
                <!-- <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">确 定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
import api from '../../../../mock';
import { fetchData } from '../../../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            tdIndex: Number,
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            editForm: {
                desc: '',
                share: ''
            },
            addContectForm: {
                share: '',
                desc: ''
            },
            tableData: [
                {
                    id: 1,
                    address: '一般开放'
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
            .get(api.api + 'wzyhqxgl/getDataOpPrivilege', {
                params: {
                    dataSetName: this.dataSetName
                }
            })
            .then(result => {
                if (result.data.msg == 'OK') {
                    let resultArr = result.data.data.gxjbs;
                    let length = resultArr.length;
                    for (let i = 0; i < length; i++) {
                        this.tableData.push({
                            id: resultArr[i].id,
                            address: resultArr[i].downloadLevel
                        });
                    }
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
            this.getData();
        },
        showEdit(index, row) {
            this.editVisible = true;
            this.tdIndex = index;
            console.log(this.tdIndex);
            this.editForm.desc = row.address;
            this.editForm.share = row.id;
        },
        addContent() {
            this.$http
                .post(api.api + 'wzyhqxgl/insertShareLevel', {
                    params: {
                        downloadLevel: '共享级别3'
                    }
                })
                .then(result => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        // this.$set(this.tableData, this.idx, this.form);
                        this.tableData.push({
                            addContectForm: {
                                share: '',
                                desc: ''
                            }
                        });
                        this.$message.success(`成功追加一条数据 ！`);
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
            this.$http
                .post(api.api + 'wzyhqxgl/deleteShareLevel', { params: ['一般共享', '一般共享2'] })
                .then(result => {
                    console.log(result);
                    if (result.data.mag == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '删除成功 ！'
                        });
                    }
                })
                .catch(err => {
                    this.$message({
                        type: 'infos',
                        message: '删除失败 ！'
                    });
                    console.log(err);
                });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
            //添加表单数据
            this.idx = index;
            this.form = row;
            this.$http
                .post(api.api + 'wzyhqxgl/updateSearchLevel', {
                    //修改开放等级
                    params: {
                        searchLevel: '一般开放',
                        id: this.tdIndex
                    }
                })
                .then(result => {
                    if (result.data.msg == 'OK') {
                        this.addVisible = false;
                        this.$message({
                            type: 'success',
                            message: '提交成功 ！'
                        });
                        this.tableData.push({
                            id: this.addContectForm.id,
                            address: this.addContectForm.desc
                        });
                    }
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
        saveEdit(index, row) {
            this.editVisible = false;
            this.$set(this.tableData, this.idx, this.form);
            this.$http
                .post(api.api + 'wzyhqxgl/updateShareLevel', {
                    //修改共享等级接口
                    params: { downloadLevel: '共享等级5', id: 6 }
                })
                .then(result => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.tableData[this.tdIndex].address = this.editForm.desc;
                        this.tableData[this.tdIndex].id = this.editForm.share;

                        this.$message.success(`修改第 ${this.tdIndex + 1} 行成功`);
                    }
                })
                .catch(err => {
                    Vue.config.devtools = true;
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
