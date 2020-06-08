<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据归档</el-breadcrumb-item>
                <el-breadcrumb-item>待处理任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!--            <div class="handle-box">-->
            <!--                <el-button-->
            <!--                    type="primary"-->
            <!--                    icon="el-icon-delete"-->
            <!--                    class="handle-del mr10"-->
            <!--                    @click="delAllSelection"-->
            <!--                >批量删除</el-button>-->
            <!--                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
            <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
            <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
            <!--                </el-select>-->
            <!--                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>-->
            <!--                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>-->
            <!--            </div>-->
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
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
                        <el-tag
                                :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}
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
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <div class="container" style="margin-top: 20px">
            <div class="handle-box">
                任务日志
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
    import { fetchData } from '../../../../api/index';

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
                tableData: [
                    {
                        id:1,
                        name:'数据资源_标准产品影像',
                        name1:'YG26',
                        name2:'\\172.16.127.185',
                        name3:'YG26',
                        name4:'541.213',
                        name5:'2020-02-05 17:00:00',
                        name6:'',
                        state:'待处理',
                    },
                ],
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
                    .catch(() => {
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
